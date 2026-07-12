import type { Request, Response } from "express";
import razorpay from "../config/razorpay.js";
import paymentModel from "../models/payment.model.js";
import { CREDIT_PLANS } from "../utils/plans.js";
import { createOrderSchema } from "../schemas/payment.schema.js";
import userModel from "../models/user.model.js";
import crypto from "crypto";

export const createOrder = async (req : Request, res:Response) => {

  const userId = req.userId;

  if(!userId){
    return res.status(400).json({
            success: false,
            message: "Invalid User",
        });
  };


try{

    const parsedData = createOrderSchema.safeParse(req.body);

    if (!parsedData.success) {
  return res.status(400).json({
    success: false,
    message:"Invalid Plan",
    errors: parsedData.error.flatten(),
  });
}
 
const {plan} = parsedData.data ;

  const selectedPlan = CREDIT_PLANS[plan];

  if (!selectedPlan) {
    return res.status(400).json({
      success: false,
      message: "Invalid plan",
    });
  }

  const order = await razorpay.orders.create({
    amount: selectedPlan.amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  await paymentModel.create({
    user: userId,
    razorpayOrderId: order.id,
    amount: selectedPlan.amount,
    credits: selectedPlan.credits,
    status: "created",
  });

  res.status(200).json({
    success: true,
    message:"Credits Added",
    order,
  });

}catch(error){
    console.error(error)
    return res.status(500).json({
        success:false,
        message:"Internal server Error"
    });
};
  
};

export const verifyPayment = async (req : Request, res:Response) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required payment details.",
      });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error("RAZORPAY_KEY_SECRET is not configured.");

      return res.status(500).json({
        success: false,
        message: "Payment verification configuration error.",
      });
    }

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature.",
      });
    }

    const payment = await paymentModel.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found.",
      });
    }

    if (payment.status === "paid") {
      return res.status(200).json({
        success: true,
        message: "Payment has already been processed.",
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      payment.user,
      {
        $inc: {
          credits: payment.credits,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User associated with this payment was not found.",
      });
    }

    payment.status = "paid";
    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;

    await payment.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully. Credits added to your account.",
      creditsAdded: payment.credits,
      currentCredits: updatedUser.credits,
    });
  } catch (error) {
    console.error(
      "Error while verifying payment:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while verifying the payment.",
    });
  }
};

export const paymentWebhook = async (
  req: Request,
  res: Response
) => {
  try {
    const webhookSignature = req.headers[
      "x-razorpay-signature"
    ] as string;

    if (!webhookSignature) {
      return res.status(400).json({
        success: false,
        message: "Missing webhook signature.",
      });
    }

    if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
      console.error("RAZORPAY_WEBHOOK_SECRET is missing.");

      return res.status(500).json({
        success: false,
        message: "Webhook configuration error.",
      });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_WEBHOOK_SECRET
      )
      .update(req.body)
      .digest("hex");

    if (expectedSignature !== webhookSignature) {
      return res.status(400).json({
        success: false,
        message: "Invalid webhook signature.",
      });
    }

    // Parse payload AFTER signature verification
    const body = JSON.parse(req.body.toString());

    const event = body.event;

    console.log("Webhook Event:", event);

    switch (event) {
      case "payment.captured":
      case "order.paid": {
        const paymentEntity =
          body.payload.payment.entity;

        const payment = await paymentModel.findOne({
          razorpayOrderId: paymentEntity.order_id,
        });

        if (!payment) {
          console.log(
            "Payment not found:",
            paymentEntity.order_id
          );

          return res.status(200).json({
            success: true,
          });
        }

        // Prevent duplicate credits
        if (payment.status === "paid") {
          return res.status(200).json({
            success: true,
          });
        }

        const user = await userModel.findById(payment.user);

        if (!user) {
          return res.status(200).json({
            success: true,
          });
        }

        user.credits += payment.credits;

        await user.save();

        payment.status = "paid";
        payment.razorpayPaymentId =
          paymentEntity.id;
        payment.razorpaySignature =
          webhookSignature;

        await payment.save();

        console.log(
          `Credits added successfully to user ${user._id}`
        );

        break;
      }

      case "payment.failed": {
        const paymentEntity =
          body.payload.payment.entity;

        const payment = await paymentModel.findOne({
          razorpayOrderId: paymentEntity.order_id,
        });

        if (payment) {
          payment.status = "failed";

          await payment.save();
        }

        console.log("Payment Failed");

        break;
      }

      case "refund.created":
      case "refund.processed": {
        console.log("Refund Event Received");
        break;
      }

      default:
        console.log("Unhandled Event:", event);
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Webhook Error:", error);

    return res.status(500).json({
      success: false,
      message: "Webhook processing failed.",
    });
  }
};
import type { Request, Response } from "express";
import razorpay from "../config/razorpay.js";
import paymentModel from "../models/payment.model.js";
import { CREDIT_PLANS } from "../utils/plans.js";

export const createOrder = async (req : Request, res:Response) => {

  const userId = req.userId;

  if(!userId){
    return res.status(400).json({
            success: false,
            message: "Invalid User",
        });
  };


try{
const { plan } = req.body;

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
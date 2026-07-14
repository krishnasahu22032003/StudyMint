import ENV_SECRETS from "../utils/ENV_SECRETS";
import createOrder from "./createOrder";
import verifyPayment from "./verifyPayment";

type PlanType =
  | "starter"
| "pro"
| "premium"

export default async function handlePaying(
  plan: PlanType
) {
  const { order } =
    await createOrder(plan);

  const options = {
    key: ENV_SECRETS.RAZOR_PAY_KEY,

    amount: order.amount,

    currency: order.currency,

    order_id: order.id,

    name: "StudyMint",

    description: "Buy Credits",

    handler: async function (
      response: any
    ) {
      const result =
        await verifyPayment({
          razorpay_order_id:
            response.razorpay_order_id,

          razorpay_payment_id:
            response.razorpay_payment_id,

          razorpay_signature:
            response.razorpay_signature,
        });

      if (result.success) {
  window.location.href =
    "/payment-success";
}
    },

    theme: {
      color: "#6366f1",
    },
  };

  const razorpay =
    new window.Razorpay(options);

    console.log({
  key: options.key,
  order_id: options.order_id,
  amount: options.amount,
})

 razorpay.on(
  "payment.failed",
  function (response: any) {
    console.error(
      "Payment Failed:",
      response
    );

    sessionStorage.setItem(
      "paymentError",
      response?.error?.description ||
        "Payment failed"
    );

    window.location.href =
      "/payment-failed";
  }
);

  razorpay.open();
}
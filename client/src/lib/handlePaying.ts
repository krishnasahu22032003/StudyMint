import createOrder from "./createOrder";
import verifyPayment from "./verifyPayment";

type PlanType =
  | "starter"
  | "popular"
  | "pro";

export default async function handlePaying(
  plan: PlanType
) {
  const { order } =
    await createOrder(plan);

  const options = {
    key: import.meta.env
      .VITE_RAZORPAY_KEY_ID,

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

      alert(result.message);
    },

    theme: {
      color: "#6366f1",
    },
  };

  const razorpay =
    new window.Razorpay(options);

  razorpay.open();
}
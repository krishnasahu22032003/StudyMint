import Razorpay from "razorpay";
import ENV_SECRETS from "../lib/ENV_SECRETS.js";

const razorpay = new Razorpay({
  key_id: ENV_SECRETS.key_id as string ,
  key_secret: ENV_SECRETS.key_secret as string
});

export default razorpay;
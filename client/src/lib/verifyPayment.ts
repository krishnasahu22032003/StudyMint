import axiosInstance from "../utils/axios";

export type VerifyPaymentPayload = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type VerifyPaymentResponse = {
  success: boolean;
  message: string;
  creditsAdded?: number;
  currentCredits?: number;
};

export default async function verifyPayment(
  paymentData: VerifyPaymentPayload
): Promise<VerifyPaymentResponse> {
  try {
    const response =
      await axiosInstance.post<VerifyPaymentResponse>(
        "/api/v1/payment/verify",
        paymentData
      );

    return response.data;
  } catch (error: any) {
    console.error(
      error?.response?.data?.message ||
      "Failed to verify payment"
    );

    throw error;
  }
}
import axiosInstance from "../utils/axios";

export type CreateOrderResponse = {
  success: boolean;
  message: string;
  order: {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    status: string;
  };
};

export type PlanType =
| "starter"
| "pro"
| "premium"

export default async function createOrder(
  plan:PlanType
): Promise<CreateOrderResponse> {
  try {
    const response =
      await axiosInstance.post<CreateOrderResponse>(
        "/api/v1/payment/create-order",
        {
          plan,
        }
      );

    return response.data;
  } catch (error: any) {
    console.error(
      error?.response?.data?.message ||
      "Failed to create payment order"
    );

    throw error;
  }
}
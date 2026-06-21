import axiosInstance from "../utils/axios";
import { clearUserData } from "../redux/userSlice";
import type { AppDispatch } from "../redux/store";
import type { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";

interface Response {
  success: boolean;
  message: string;
}

export default async function handleSignOut(
  dispatch: AppDispatch,
  navigate: NavigateFunction
): Promise<Response> {
  try {
    const response = await axiosInstance.post<Response>(
      "/api/v1/user/logout"
    );

    dispatch(clearUserData());

    toast.success(response.data.message);

    navigate("/");

    return response.data;
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
      "Logout failed"
    );

    throw error;
  }
}
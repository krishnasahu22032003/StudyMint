import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import axiosInstance from "./axios";
import { setUserData } from "../redux/userSlice";
import type { AppDispatch } from "../redux/store";

export default async function handleGoogleAuth(
    dispatch: AppDispatch
) {
    try {
        const response = await signInWithPopup(
            auth,
            provider
        );

        const user = response.user;

        const result = await axiosInstance.post(
            "/api/v1/user/google-auth",
            {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            }
        );

        dispatch(
            setUserData(result.data.data.user)
        );

    } catch (error: any) {
        console.log(error.response?.data);
    }
}
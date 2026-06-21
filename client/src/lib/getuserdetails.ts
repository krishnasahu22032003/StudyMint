import type { AppDispatch } from "../redux/store";
import { setUserData } from "../redux/userSlice";
import axiosInstance from "../utils/axios";


export default async function getUserDetails(dispatch:AppDispatch) {

    try {

        const response = await axiosInstance.get("/api/v1/user/me");
       dispatch(setUserData(response.data.data)) ;

    } catch (error: any) {

        console.log(error.response.message)

    };

};


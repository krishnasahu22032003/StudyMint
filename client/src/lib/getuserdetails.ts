import axiosInstance from "../utils/axios";


export default async function getUserDetails() {

    try {

        const response = await axiosInstance.get("/api/v1/user/me");
        console.log(response.data)
        return response.data;
        
    } catch (error: any) {

        console.log(error.response.message)

    };

};


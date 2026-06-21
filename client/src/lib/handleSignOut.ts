import axiosInstance from "../utils/axios";

interface Response {

    success: boolean,
    message: string

};

async function handleSignOut():Promise<Response> {

    try {

        const response = await axiosInstance.post<Response>("/api/v1/user/logout");
        return response.data;

    } catch (error: any) {
        console.error(error.response.data.message);
        throw error ;
    };
};

export default handleSignOut ;
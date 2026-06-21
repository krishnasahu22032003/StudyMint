import axios from "axios" ;
import ENV_SECRETS from "./ENV_SECRETS";

const axiosInstance = axios.create({
    baseURL:ENV_SECRETS.SERVER_URL ,
    withCredentials:true

});

export default axiosInstance ;
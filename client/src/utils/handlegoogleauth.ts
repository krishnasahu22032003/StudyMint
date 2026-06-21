import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import axiosInstance from "./axios";

async function handleGoogleAuth() {

    try {

        const response = await signInWithPopup(auth, provider);
        const user = response.user;
        const name = user.displayName;
        const email = user.email
        const photoURL = user.photoURL ;
       
      const result = await axiosInstance.post("/api/v1/user/google-auth" ,{name , email , photoURL}) ;
      console.log(result.data) ;

    } catch (error:any) {
        console.log(error.response.data);
    };

};

export default handleGoogleAuth;
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

async function handleGoogleAuth(){

    try{
     
const response = await signInWithPopup(auth , provider);

    }catch(error){
        
    };

};

export default handleGoogleAuth ;
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

async function handleGoogleAuth() {

    try {

        const response = await signInWithPopup(auth, provider);
        const user = response.user;
        const name = user.displayName;
        const email = user.email

    } catch (error) {
        console.log(error);
    };

};

export default handleGoogleAuth;
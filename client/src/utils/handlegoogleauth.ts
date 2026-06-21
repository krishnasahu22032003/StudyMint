import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

async function handleGoogleAuth() {

    try {

        const response = await signInWithPopup(auth, provider);
        const user = response.user;
        const name = user.displayName;
        const email = user.email
        const photoURL = user.photoURL ;

    } catch (error) {
        console.log(error);
    };

};

export default handleGoogleAuth;
import { initializeApp } from "firebase/app";
import ENV_SECRETS from "./ENV_SECRETS";

const firebaseConfig = {
  apiKey: ENV_SECRETS.FIREBASE_KEY ,
  authDomain: "authstudymint.firebaseapp.com",
  projectId: "authstudymint",
  storageBucket: "authstudymint.firebasestorage.app",
  messagingSenderId: "410868664600",
  appId: "1:410868664600:web:1b69fadc5530f0a1d3b66d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import express from "express" ; 
import { googleAuth, logOut } from "../controllers/auth.controller.js";

const UserRouter = express.Router();

UserRouter.post("/google-auth" , googleAuth) ;
UserRouter.post("/logout" , logOut) ;

export default UserRouter ; 
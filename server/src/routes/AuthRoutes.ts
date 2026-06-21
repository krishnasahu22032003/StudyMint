import express from "express" ; 
import { googleAuth } from "../controllers/auth.controller.js";

const UserRouter = express.Router();

UserRouter.post("/google-auth" , googleAuth) ;

export default UserRouter ; 
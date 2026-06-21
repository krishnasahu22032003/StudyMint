import express from "express";
import { googleAuth, logOut } from "../controllers/auth.controller.js";
import { getCurrentUser } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";

const UserRouter = express.Router();

UserRouter.post("/google-auth", googleAuth);
UserRouter.post("/logout", authMiddleware, logOut);
UserRouter.get("/me", authMiddleware, getCurrentUser);

export default UserRouter; 
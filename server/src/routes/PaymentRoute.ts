import express from "express";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import { createOrder, verifyPayment } from "../controllers/credit.controller.js";

const PaymentRouter = express.Router();

PaymentRouter.post("/create-order", authMiddleware, createOrder);

PaymentRouter.post("/verify", authMiddleware, verifyPayment);

export default PaymentRouter;
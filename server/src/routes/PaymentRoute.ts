import express from "express";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import { createOrder, paymentWebhook, verifyPayment } from "../controllers/credit.controller.js";

const PaymentRouter = express.Router();

PaymentRouter.post("/create-order", authMiddleware, createOrder);

PaymentRouter.post("/verify", authMiddleware, verifyPayment);
PaymentRouter.post("/webhook", paymentWebhook);

export default PaymentRouter;
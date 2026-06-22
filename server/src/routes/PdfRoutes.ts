import express from "express" ;
import authMiddleware from "../middlewares/AuthMiddleware.js";

const PdfRouter = express.Router();

PdfRouter.post("/generate-pdf" ,authMiddleware , )

export default PdfRouter ; 
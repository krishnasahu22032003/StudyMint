import express from "express" ;
import authMiddleware from "../middlewares/AuthMiddleware.js";
import { pdfDownload } from "../controllers/pdf.controller.js";

const PdfRouter = express.Router();

PdfRouter.post("/generate-pdf" ,authMiddleware ,pdfDownload )

export default PdfRouter ; 
import express, { type Request, type Response } from "express" ;
import startServer from "./lib/startServer.js";
import UserRouter from "./routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import cors from  "cors" ;
import NotesRouter from "./routes/NotesRoutes.js";
import PdfRouter from "./routes/PdfRoutes.js";

const app = express() ;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173" ,
    credentials:true 
})); 

app.use("/api/v1/user" , UserRouter) ;
app.use("/api/v1/notes" , NotesRouter) ;
app.use("/api/v1/pdf" , PdfRouter);

startServer(app) ;
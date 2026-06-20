import express, { type Request, type Response } from "express" ;
import startServer from "./lib/startServer.js";

const app = express() ;

app.use(express.json());

app.get("/" , (req:Request ,res:Response)=>{
    res.send("Hello world ")
})


startServer(app) ;
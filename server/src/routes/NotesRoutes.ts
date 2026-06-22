import express from "express" ;
import authMiddleware from "../middlewares/AuthMiddleware.js";
import { generateNotes } from "../controllers/generate.controller.js";

const NotesRouter = express.Router() ;

NotesRouter.post("/generate-notes" , authMiddleware , generateNotes );

export default NotesRouter ;
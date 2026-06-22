import express from "express" ;
import authMiddleware from "../middlewares/AuthMiddleware.js";
import { generateNotes } from "../controllers/generate.controller.js";
import { getSingleNotes, getUserNotes } from "../controllers/notes.controller.js";

const NotesRouter = express.Router() ;

NotesRouter.post("/generate-notes" , authMiddleware , generateNotes );
NotesRouter.get("/get-notes" , authMiddleware ,getUserNotes );
NotesRouter.get("/:id" , authMiddleware ,getSingleNotes );

export default NotesRouter ;
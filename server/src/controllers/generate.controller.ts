import type { Request, Response } from "express";
import userModel from "../models/user.model.js";
import { generateGeminiResponse } from "../services/gemini.service.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { GenerateNotesSchema } from "../schemas/generate.schema.js";
import Notes from "../models/notes.model.js";

export async function generateNotes(req: Request, res: Response) {

    if (!req.userId) {

        return res.status(400).json({
            success: false,
            message: "Invalid User",
        });
    };

    try {

        const parsedData = GenerateNotesSchema.safeParse(req.body);

        if (!parsedData.success) {

            return res.status(400).json({
                success: false,
                message: "Invalid Input",
                error: parsedData.error.flatten()
            });
        };

        const { topic, classLevel, examType, revisionMode, includeDiagram, includeChart } = parsedData.data;

        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        };

        if (user.credits < 10) {
            user.isCreditAvailable = false
            await user.save();
            return res.status(400).json({
                success: false,
                message: "Insufficient credits"
            });
        };

        const prompt = buildPrompt({
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart
        });

        const aiResponse = await generateGeminiResponse(prompt);

        const notes = await Notes.create({
            user: user._id,
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart,
            content: aiResponse
        });

        user.credits -= 10;

        if (user.credits <= 0) user.isCreditAvailable = false;

        if (!Array.isArray(user.notes)) {
            user.notes = [];
        };

        user.notes.push(notes._id);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Notes generated",
            ata: aiResponse,
            noteId: notes._id,
            creditsLeft: user.credits
        })
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }


}
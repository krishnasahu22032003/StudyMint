import type { Request ,Response} from "express";
import Notes from "../models/notes.model.js";

export const getUserNotes = async (
  req: Request,
  res: Response
) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const notes = await Notes.find({
      user: req.userId,
    })
      .select(
        "topic classLevel examType revisionMode includeDiagram includeChart createdAt"
      )
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    console.error("Get User Notes Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
    });
  }
};
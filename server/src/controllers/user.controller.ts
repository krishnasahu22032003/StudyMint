import type { Request, Response } from "express";
import userModel from "../models/user.model.js";

export async function getCurrentUser(req: Request, res: Response) {

    if (!req.userId) {

        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    };


    try {

        const userId = req.userId;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exists"
            });
        };

        return res.status(200).json({
            success: true,
            message: "User details fetched",
            data: user
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    };

};
import userModel from "../models/user.model.js";
import { googleAuthSchema } from "../schemas/auth.schema.js";
import type { Response, Request } from "express";
import generateToken from "../utils/token.js";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "../config/cookie.js";

export async function googleAuth(req: Request, res: Response) {

    const parsedData = googleAuthSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials",
            error: parsedData.error.flatten()
        });
    };

    const { name, email, photoURL } = parsedData.data;

    try {

        let user = await userModel.findOne({ email });

        const userData = {

            name,
            email,
            ...(photoURL && { photoURL }),
        }

        if (!user) {

            user = await userModel.create(userData);

        }

        let token = await generateToken(user._id);

        res.cookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);

        return res.status(201).json({
            success: true,
            message: "User created Successfully",
            data: {
                user
            }
        });
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    };

};

export function logOut(req:Request , res:Response){

    try {
        res.clearCookie(
            AUTH_COOKIE_NAME,
            AUTH_COOKIE_OPTIONS
        );

        return res.status(200).json({
            success: true,
            message: "Signed out successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    };

};


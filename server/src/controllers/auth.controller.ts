import userModel from "../models/user.model.js";
import { googleAuthSchema } from "../schemas/auth.schema.js";
import type { Response , Request } from "express";

export async function googleAuth(req:Request , res:Response){

const parsedData = googleAuthSchema.safeParse(req.body) ;

if(!parsedData.success){
    return res.status(400).json({
        success:false,
        message:"Invalid Credentials",
        error:parsedData.error.flatten()
    }) ;
};

const {name , email , photoURL}  = parsedData.data ;

try{

let user = await userModel.findOne({email}) ;

if(!user){
    user = await userModel.create({
name ,email , photoURL
    })
}

}

}
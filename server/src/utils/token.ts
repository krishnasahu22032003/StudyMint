import jwt from "jsonwebtoken" ;
import ENV_SECRETS from "../lib/ENV_SECRETS.js";
import type { Types } from "mongoose";

async function generateToken(userId : Types.ObjectId){

const secret = ENV_SECRETS.JWT_SECRET as string ; 

try{

const token = await jwt.sign({userId} , secret , {expiresIn:"7d"} );
return token ;


}catch(error){

console.error(error)

};

};

export default generateToken ; 
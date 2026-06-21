import jwt from "jsonwebtoken" ;
import ENV_SECRETS from "../lib/ENV_SECRETS.js";

interface jwt_payload {

    userId: string
};

export default function verifyToken(token:string){

    const secret = ENV_SECRETS.JWT_SECRET as string ; 

    return jwt.verify(token , secret) as jwt_payload ;

};


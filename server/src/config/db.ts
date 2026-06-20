import mongoose from "mongoose";
import ENV_SECRETS from "../lib/ENV_SECRETS.js";

async function ConnectDB() {

    try {

        await mongoose.connect(ENV_SECRETS.DB_URL as string);
        console.log("Connected to DB");

    } catch (error) {
        console.error("Database Connection Failed", error);
        process.exit(1);

    };
};

export default ConnectDB ;


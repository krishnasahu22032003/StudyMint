import type { Express } from "express";
import ENV_SECRETS from "./ENV_SECRETS.js";
import ConnectDB from "../config/db.js";

async function startServer(app: Express) {

    const PORT = ENV_SECRETS.BACKEND_PORT;
    try {

        await ConnectDB();

        app.listen(PORT, () => {
            console.log(`App is running on ${PORT}`);
        });
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    };
};

export default startServer;
import "dotenv/config"

const ENV_SECRETS = {

BACKEND_PORT : process.env.PORT,
DB_URL:process.env.MONGO_URL,
JWT_SECRET:process.env.JWT_SECRET ,
GEMINI_KEY:process.env.GEMINI_API_KEY

};

export default ENV_SECRETS ;
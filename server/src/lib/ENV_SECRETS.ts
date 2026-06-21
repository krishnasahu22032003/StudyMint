import "dotenv/config"

const ENV_SECRETS = {

BACKEND_PORT : process.env.PORT,
DB_URL:process.env.MONGO_URL,
JWT_SECRET:process.env.JWT_SECRET 

};

export default ENV_SECRETS ;
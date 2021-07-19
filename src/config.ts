import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";

dotenv.config();

export default cleanEnv(process.env, {
    API_ID: num(),
    API_HASH: str(),
    STRING_SESSION: str(),
    LOG_CHAT_ID: num(),
    DB_URI: str(),
    DB_NAME: str({ default: "gramjsuserbot" }),
    CONNECTION_RETRIES: num({ default: 10 }),
    LOG_LEVEL: str({ default: "none" }),
    COMMAND_PREFIXES: str({ default: ". ;" }),
});

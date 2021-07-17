import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { Logger } from "telegram/extensions";

import config from "../config";

Logger.setLevel(config.LOG_LEVEL);

export const client = new TelegramClient(
    new StringSession(config.STRING_SESSION),
    config.API_ID,
    config.API_HASH,
    {
        connectionRetries: config.CONNECTION_RETRIES,
    },
);

export const start = async () => {
    client.setParseMode("html");
    await client.start({ botAuthToken: "" });
};

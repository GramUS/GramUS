import { TelegramClient } from "telegram";
import { NewMessage, NewMessageEvent } from "telegram/events";
import { escape } from "html-escaper";
import config from "../../config";
import { client } from "../client";

export default class {
    handler: (event: NewMessageEvent) => void;
    event: NewMessage;

    constructor(
        handler: (client: TelegramClient, event: NewMessageEvent) => void,
        event: NewMessage,
    ) {
        this.handler = (event: NewMessageEvent) => {
            try {
                return handler(client, event);
            } catch (e) {
                return client.sendMessage(config.LOG_CHAT_ID, {
                    message: escape(
                        e instanceof Error ? e.name + ": " + e.message : e,
                    ),
                });
            }
        };
        this.event = event;
    }

    add(client: TelegramClient) {
        client.addEventHandler(this.handler, this.event);
    }
}

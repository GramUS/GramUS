import { readdirSync } from "fs";
import { join } from "path";
import { TelegramClient } from "telegram";
import MessageHandler from "./MessageHandler";

export default class HandlerLoader {
    dirName: string;
    toIgnore: string[];
    handlers: MessageHandler[];

    constructor(dirName: string, toIgnore?: string[]) {
        this.dirName = dirName;
        this.toIgnore = toIgnore || [];
        this.handlers = [];
    }

    load() {
        const all = readdirSync(this.dirName);
        const canBeLoaded = (() => {
            const toReturn: string[] = [];
            all.forEach(val => {
                if (!val.startsWith("index")) {
                    if (val.endsWith(".ts") || val.endsWith(".js")) {
                        toReturn.push(val.slice(0, val.length - 3));
                    } else {
                        toReturn.push(val);
                    }
                }
            });

            return toReturn;
        })();

        canBeLoaded.forEach(val => {
            if (!this.toIgnore.includes(val)) {
                try {
                    const handlers: MessageHandler | MessageHandler[] =
                        require(join(this.dirName, val)).default;

                    if (handlers instanceof MessageHandler) {
                        this.handlers.push(handlers);
                    } else if (Array.isArray(handlers)) {
                        this.handlers.push(...handlers);
                    }
                } catch (err) {
                    console.warn(`Could not load ${val}: ${err}`);
                }
            }
        });

        return this;
    }

    add(client: TelegramClient) {
        this.handlers.forEach(handler => {
            handler.add(client);
        });
    }
}

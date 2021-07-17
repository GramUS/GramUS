import { TelegramClient } from "telegram";
import { NewMessage, NewMessageEvent } from "telegram/events";
import config from "../../config";
import { getErrorText, getArgs } from "../functions";
import MessageHandler from "./MessageHandler";

export default class extends MessageHandler {
    match(event: NewMessageEvent, commands: string[]): boolean {
        const message = event.message.message;

        if (!message) {
            return false;
        }

        const prefixes = config.COMMAND_PREFIXES.split(/\s/);

        for (let k in prefixes) {
            const prefix = prefixes[k];

            if (message.startsWith(prefix)) {
                for (let k in commands) {
                    const command = commands[k];
                    const withoutPrefix = message.slice(1, message.length);

                    if (
                        withoutPrefix.match(
                            new RegExp(`^(?:${command})(?:\\s|$)`),
                        )
                    ) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    constructor(
        handler: (client: TelegramClient, event: NewMessageEvent) => void,
        params: {
            commands: string | string[];
            mode?: "outgoing" | "incoming";
            chatType?: "private" | "group";
            requiredArgs?: number;
        },
    ) {
        super(
            async (client, event) => {
                if (
                    !this.match(
                        event,
                        Array.isArray(params.commands)
                            ? params.commands
                            : [params.commands],
                    )
                ) {
                    return;
                }

                if (params.chatType) {
                    switch (params.chatType) {
                        case "private":
                            if (!event.isPrivate) {
                                return event.message.edit({
                                    text: getErrorText(
                                        "This command is for private chats",
                                    ),
                                });
                            }
                        case "group":
                            if (!event.isGroup) {
                                return event.message.edit({
                                    text: getErrorText(
                                        "This command is for groups",
                                    ),
                                });
                            }
                    }
                }

                if (params.requiredArgs) {
                    if (getArgs(event.message).length < params.requiredArgs) {
                        return event.message.edit({
                            text: getErrorText(
                                `This command requires ${
                                    params.requiredArgs
                                } argument${
                                    params.requiredArgs == 1 ? "" : "s"
                                }`,
                            ),
                        });
                    }
                }

                return handler(client, event);
            },
            new NewMessage({
                outgoing: (params?.mode || "outgoing") == "outgoing",
                incoming: (params?.mode || "outgoing") == "incoming",
            }),
        );
    }
}

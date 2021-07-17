import { Message } from "telegram/tl/custom/message";

export const removeCommand = (message: Message): string =>
    message.message
        ? message.message
              .slice(
                  message.message.split(/\s/)[0].length,
                  message.message.length,
              )
              .trim()
        : "";

export const getArgs = (message: Message): string[] =>
    message.message
        ? message.message
              .split(/\s/)
              .slice(1, message.message.split(/\s/).length)
        : [];

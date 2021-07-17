import { CommandHandler, getResultText } from "../userbot";
import { parseTime } from "../utils";

export default new CommandHandler(
    (_, event) =>
        event.message.edit({
            text: getResultText(parseTime(process.uptime())),
        }),
    { commands: "uptime" },
);

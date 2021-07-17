import { CommandHandler, getResultText } from "../userbot";

export default new CommandHandler(
    async (_, event) => {
        const toSubtract = new Date().getTime();
        await event.message.edit({ text: "<code>...</code>" });
        await event.message.edit({
            text: getResultText(`${new Date().getTime() - toSubtract}ms`),
        });
    },
    { commands: "ping" },
);

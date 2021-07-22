import { Api } from "telegram";
import { CommandHandler, getResultText } from "../userbot";
import bigInt from "big-integer";

export default new CommandHandler(
    async (client, event) => {
        const toSubtract = new Date().getTime();
        await client.invoke(
            new Api.Ping({
                pingId: bigInt(client.session.dcId),
            }),
        );
        await event.message.edit({
            text: getResultText(`${new Date().getTime() - toSubtract}ms`),
        });
    },
    { commands: "ping" },
);

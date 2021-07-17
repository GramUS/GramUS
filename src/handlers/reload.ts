import { CommandHandler, getResultText } from "../userbot";
import { addModules } from "../modules";
import { handlers } from ".";

export default new CommandHandler(
    async (client, event) => {
        await event.message.edit({
            text: getResultText("Reloading..."),
        });

        client._eventBuilders = [];
        handlers.add(client);

        await addModules(client);
        await event.message.edit({ text: getResultText("Reloaded") });
    },
    { commands: "reload" },
);

import { getModules, updateModule } from "../database/modules";
import { getModule } from "../modules/get";
import {
    CommandHandler,
    getResultText,
    getErrorText,
    removeCommand,
} from "../userbot";

export default new CommandHandler(
    async (_, event) => {
        const args = removeCommand(event.message).split("/");

        if (!(args.length >= 2 || args.length <= 4)) {
            await event.message.edit({
                text: getErrorText("Invalid args length"),
            });
        }

        const repo = args[1],
            name = args[2] || repo,
            content = await getModule(args[0], repo, name, args[3] || "main");

        await updateModule({ name, content });
        await event.message.edit({ text: getResultText("Module updated") });
    },
    { commands: "update", requiredArgs: 1 },
);

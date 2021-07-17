import { deleteModule } from "../database/modules";
import { CommandHandler, getArgs, getResultText } from "../userbot";

export default new CommandHandler(
    async (_, event) => {
        await event.message.edit({
            text: getResultText(
                (await deleteModule(getArgs(event.message)[0])) != 0
                    ? "Module deleted"
                    : "Module not deleted",
            ),
        });
    },
    { commands: "delete", requiredArgs: 1 },
);

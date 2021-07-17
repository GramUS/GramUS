import { exec } from "child_process";
import { writeFileSync, rmSync } from "fs";
import { createHash } from "crypto";
import { escape } from "html-escaper";

import {
    CommandHandler,
    getResultText,
    getErrorText,
    removeCommand,
} from "../userbot";

export default new CommandHandler(
    async (_, event) => {
        const command = removeCommand(event.message);

        exec(command, async (err, stdout, stderr) => {
            stdout = stdout.trim() || "None";
            stderr = stderr.trim() || "None";

            if (err) {
                await event.message.edit({
                    text: getErrorText(escape(err.name + ": " + err.message)),
                });
            } else if (stdout == "None" && stderr == "None") {
                await event.message.edit({ text: getResultText("No output") });
            } else {
                const message = `<code>→</code> stdout:<code>\n${escape(
                    stdout,
                )}</code>\n\n<code>→</code> stderr:\n<code>${escape(
                    stderr,
                )}</code>`;

                if (message.length > 4000) {
                    const data = `stdout:\n${stdout}\n\nstderr:\n${stderr}`;
                    const path = `output-${createHash("md5")
                        .update(data)
                        .digest("hex")}.txt`;
                    writeFileSync(path, data);
                    await event.message.reply({ file: path, message: "" });
                    rmSync(path);
                } else {
                    await event.message.reply({ message });
                }
            }
        });
    },
    { commands: ["sh", "shell"] },
);

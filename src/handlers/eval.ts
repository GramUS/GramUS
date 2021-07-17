/*

Inspired by Ion, github.com/ionbot.

*/

import { writeFileSync, rmSync } from "fs";
import { NodeVM, VMScript } from "vm2";
import { escape } from "html-escaper";
import { CommandHandler } from "../userbot";

export default new CommandHandler(
    async (client, event) => {
        if (!event.message.message) {
            return;
        }

        const vm = new NodeVM({
            console: "inherit",
            sandbox: { client, event },
            require: {
                external: true,
                builtin: ["fs", "path", "process", "os"],
            },
        });

        const code = event.message.message
            .slice(event.message.message.split(/\s/g)[0].length)
            .trim();
        let output = "";

        try {
            const script = new VMScript(`module.exports = ${code}`);
            const result = vm.run(script);

            if (result instanceof Promise) {
                output = await result;
            }
        } catch (e) {
            output = String(e);
        }

        if (output.length < 4097) {
            await event.message.reply({
                message: `<code>${escape(output)}</code>`,
            });
        } else {
            const file = "output-" + String(new Date().getTime()) + ".txt";
            writeFileSync(file, output);
            await event.message.reply({
                file: file,
                message: "",
            });
            rmSync(file);
        }
    },
    { commands: "eval" },
);

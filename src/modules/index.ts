import * as fs from "fs";
import * as path from "path";
import { TelegramClient } from "telegram";

import { getModules } from "../database/modules";
import { HandlerLoader } from "../userbot";

export const modulesPath = path.join(
    path.dirname(path.dirname(__dirname)),
    "installed_modules",
);

export async function addModules(client: TelegramClient) {
    if (fs.existsSync(modulesPath)) {
        fs.rmSync(modulesPath, { recursive: true, force: true });
    }

    fs.mkdirSync(modulesPath);

    (await getModules()).forEach(module => {
        fs.writeFileSync(
            path.join(modulesPath, `${module.name}.js`),
            module.content,
        );
    });

    new HandlerLoader(modulesPath).load().add(client);
}

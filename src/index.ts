import { connect } from "./database";
import { client, start } from "./userbot";
import { handlers } from "./handlers";
import { addModules } from "./modules";

(async () => {
    await start();
    handlers.add(client);
    await connect();
    await addModules(client);
})();

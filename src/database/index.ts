import { MongoClient } from "mongodb";
import config from "../config";

export const client = new MongoClient(config.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

export function getDatabase() {
    return client.db(config.DB_NAME);
}

export function getCollection(name: string) {
    return getDatabase().collection(name);
}

export async function connect() {
    await client.connect();
}

import { getCollection } from ".";

function collection() {
    return getCollection("modules");
}

interface Module {
    name: string;
    content: string;
}

export const updateModule = (module: Module) =>
    collection().updateOne(
        { name: module.name },
        { $set: { content: module.content } },
        { upsert: true },
    );

export const getModules = (): Promise<Module[]> =>
    collection().find().toArray();

export const deleteModule = async (name: string) =>
    (await collection().deleteOne({ name })).deletedCount || 0;

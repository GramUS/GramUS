import fetch from "node-fetch";

function getUrl(user: string, repo: string, name: string, branch: string) {
    return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${name}/${name}.js`;
}

export async function getModule(
    user: string,
    repo: string,
    name: string,
    branch: string,
) {
    const res = await fetch(getUrl(user, repo, name, branch));

    if (![200, 302].includes(res.status)) {
        throw new Error(`Error getting module: got status code ${res.status}`);
    } else if (!res.headers.get("content-type")?.startsWith("text/plain")) {
        throw new Error("Error getting module: invalid content type");
    }

    const text = await res.text();

    if (text.length > 5242880) {
        throw new Error("Error getting module: invalid size");
    }

    return text;
}

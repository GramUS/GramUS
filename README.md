<div align="center">
    <img src="./gramus-logo.svg" style="width: 20vw;" />
    <h1>GramJS Userbot</h1>
    <p>An extensible and minimal Telegram userbot made with <a href="https://github.com/gram-js/gramjs">GramJS</a>.</p>
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/GramUS/GramUS?style=flat-square">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/GramUS/GramUS?label=size&style=flat-square">
    <img alt="GitHub" src="https://img.shields.io/github/license/GramUS/GramUS?style=flat-square">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/GramUS/GramUS?style=flat-square">
    <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/GramUS/GramUS?style=flat-square">
    <p>
        <a href="https://github.com/GramUS/modules">Modules</a>
        &middot;
        <a href="https://github.com/GramUS/GramUS/wiki">Wiki</a>
        &middot;
        <a href="https://heroku.com/deploy?template=https://github.com/GramUS/GramUS">Deploy to Heroku</a>
    </p>
</div>

## Features

-   Doesn't require you a lot of resources to run it.
-   Lets you install custom modules.
-   Logs errors in a chat.
-   Minimalist design.

## Configuring

### Required variables

-   `API_ID`: Telegram app ID
-   `API_HASH`: Telegram app hash
-   `STRING_SESSION`: GramJS string session
-   `LOG_CHAT_ID`: Log chat ID
-   `DB_URI`: MongoDB URI

### Optional variables

-   `DB_NAME`: Database name, this is usually set when using MongoDB Atlas. Default is `gramus`.
-   `COMMAND_PREFIXES`: List of characters separated by whitespace to use as command prefixes. Default is `. ;`.
-   `LOG_LEVEL`: GramJS log level. Default is `none`.
-   `CONNECTION_RETRIES`: GramJS client connection retries. Default is `10`.

## Deploying

### Heroku

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/GramUS/GramUS)

### On a server

1. Install:

```bash
npm install
```

2. Build:

```bash
npm run build
```

3. Start:

```bash
npm start
```

## License

<div align="center">
    <a href="https://www.gnu.org/licenses/lgpl-3.0.en.html"><img src="https://i.ibb.co/7bFXvHK/g325.png" style="width: 50vw;" /></a>
    <p><a href="./LICENSE">View LICENSE file</a></p>
</div>

## Credits

-   [Roj Serbest](https://github.com/rojserbest): lead developer.
-   [Akash](https://github.com/BLUE-DEVIL1134), [Gowtham2003](https://github.com/Gowtham2003): developers.
-   [Painor](https://github.com/painor), [Andrew](https://github.com/AndrewLaneX), [Watzon](https://github.com/watzon): [GramJS](https://github.com/gram-js/gramjs) developers.
-   [Xen](https://github.com/xencodes): [Ion](https://github.com/ionbot) developer.

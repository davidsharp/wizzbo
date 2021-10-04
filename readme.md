# wizzbo

wizzbo is a Discord bot (running in node, using discord.js), it doesn't do anything flash, it's just a playground for me

maybe it'll have cool features one day or a single specific purpose, but for now, nope

## commands

### /scry
scry has two options:
- question | takes a string and replies, magic 8-ball style
- fate | takes a mentionable (user/role) and gives a vague/silly fortune

## running wizzbo

If you're running wizzbo locally, it looks for a `config.json`, which is gitignored, however if (like me) you're running wizzbo from Glitch, it relies on environment variables if a config file is not found. To run it'll need:
* clientId | the bot user's OAuth2 client ID
* token | the bot's token
* guildId | the server ID where it's to be used (currently works on a single server, this ID can be copied from Discord when in develope mode)

Commands are registered using `node deploy-commands`, then to run the server `node index`/`npm start`/`yarn start`

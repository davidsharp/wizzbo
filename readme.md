# wizzbo

wizzbo is a Discord bot (running in node, using discord.js), it doesn't do anything flash, it's just a playground for me

maybe it'll have cool features one day or a single specific purpose, but for now, nope

## commands

### /scry
scry has two options:
- question | takes a string and replies, magic 8-ball style
- fate | takes a mentionable (user/role) and gives a vague/silly fortune

### /vote [subcommand]
vote has 4 subcommands:
- setup | starts a poll (unique to each channel), which takers a number of players (voters), and optionally a number of votes (default=3), whether the votes are weighted (with the first vote per player being worth the most and decreasing, default=true) and entries (functionally does nothing, but displays in setup message)
- cast | allows a player to vote for a numbered entry, will display a player's remaining number of votes, once every player has used all their votes, closes the poll and displays the results
- end | ends a poll prematurely and displays results, useful if too many player's assigned, for example
- status | displays how many votes have been cast and how many players have voted

## running wizzbo or subbots

If you're running wizzbo locally, it looks for a `config.json`, which is gitignored, however if (like me) you're running wizzbo from Glitch, it relies on environment variables if a config file is not found. To run it'll need:
* clientId | the bot user's OAuth2 client ID
* token | the bot's token

Subbots can be run by using JSON/stringified JSON config with the appropriate bot name being added to index

Commands are registered using `node deploy-commands`, then to run the server `node index`/`npm start`/`yarn start`

## deploying only a subset of commands

If you want to run a bot that only uses a subset of commands (ie, just the voting commands), wizzbo's deploy-commands can also take a number of arguments to limit the commands deployed
* -s/--sub=[name] ~ deploy for sub-bot
* -a / --all ~ deploys all commands (default)
* [any named command] ~ deploys only listed commands, eg: \`node deploy-commands scry\`

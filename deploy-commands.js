const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const { commands } = require('./commands')

const argv = require('minimist')(process.argv.slice(2));

if(argv.h){
  console.log(`deploy-commands.js (deploys bot commands):
-h ~ shows this help message
-a / --all ~ deploys all commands (default)
[any named command] ~ deploys only listed commands, eg: \`node deploy-commands scry\``);
  return;
}

let deployedCommands = []
if(argv.a||argv.all||argv._.length===0) deployedCommands = commands;
else argv._.forEach(
  command => {
    const found = commands.find(c=>c.name==command)
    if(found)deployedCommands.push(found)
  }
)

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: deployedCommands })
  .then(() => console.log(`Successfully registered application commands:
  ${deployedCommands.map(c=>c.name).join('\n  ')}`))
  .catch(console.error);

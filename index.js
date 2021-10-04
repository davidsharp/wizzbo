// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

let config
try {
  config = JSON.parse(require('fs').readFileSync('./config.json'))
}catch(e){
  console.log('No config.json, using process.env')
  config = process.env
}

const { token } = config

const { collection } = require('./commands')

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = collection

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  console.log(interaction.toJSON())

  const { commandName } = interaction;

  const command = client.commands.get(commandName);

  if (!command) {
    await interaction.reply('whoopsie poopsie')
    return;
  }

  try {
    await command.execute(interaction,{client});
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

// Login to Discord with your client's token
client.login(process.env.token || token);
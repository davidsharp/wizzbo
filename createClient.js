// Require the necessary discord.js classes
import { Client, Intents } from '@discordjs/core'

const createClient = ({name, config, collection}) => {
  // Create a new client instance
  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

  client.commands = collection

  // When the client is ready, run this code (only once)
  client.once('ready', () => {
    console.log(`${name} ready!`);
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
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if(command.failure) await command.failure(interaction);
      else await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  });

  // Login to Discord with your client's token
  client.login(config.token);
}

export default createClient
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  execute: async interaction => {
    console.log(interaction)
    await interaction.reply('Pong!')
  },
}

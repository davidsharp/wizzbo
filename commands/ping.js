import { SlashCommandBuilder } from '@discordjs/builders'

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  execute: async interaction => {
    console.log(interaction)
    await interaction.reply('Pong!')
  },
}

import { SlashCommandBuilder } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  execute: async interaction => {
    console.log(interaction)
    await interaction.reply('Pong!')
  },
}

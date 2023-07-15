import { SlashCommandBuilder } from '@discordjs/builders'

export default {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with user info!'),
  execute: async interaction => {
    await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`)
  },
}

import { SlashCommandBuilder } from '@discordjs/builders'

export default {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with server info!'),
  execute: async interaction => {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`)
  },
}

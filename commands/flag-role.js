const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flag-role')
    .setDescription('set\'s a flag role')
    .addStringOption(option => option.setName('emoji').setDescription('what should wizzbo seek?')),
  execute: async interaction => {
    const emoji = interaction.options.getString('emoji')?.trim()

    if(emoji) {
      // TODO: make this not stupidly unsafe
      const role = interaction.guild.roles.cache.find(role => role.name === emoji)
      if(!role){
        await guild.roles.create({
          data: {
            name: emoji,
          },
          reason: `Wizzbo auto-magically created required ${emoji} role`,
        })
      }
      message.member.addRole(role)
      await interaction.reply(`Done! ${emoji}`)
    }
    else await interaction.reply({content:`wizzbo needs an emoji to set as a role`,ephemeral:true});
  },
  failure: async interaction => {
    await interaction.reply({content:'didnae work',ephemeral:true})
  }
}

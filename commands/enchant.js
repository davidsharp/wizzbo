const { SlashCommandBuilder } = require('@discordjs/builders')
const fraktur = require('fraktur');

// TODO - /dispel
//   also add an "enchanted ✨" role
//   also add a timer?

module.exports = {
  data: new SlashCommandBuilder()
    .setName('enchant')
    .setDescription('enchant a user')
    .addUserOption(option => option.setName('fellow').setDescription('enchant whom?')),
  execute: async interaction => {
    const fellow = interaction.options.getUser('fellow')

    if(fellow)console.log(fellow)

    if(fellow) {
      // set nickname
      await interaction.reply(fraktur(`wizzbo has enchanted _${fellow.nickname || (fellow.user && fellow.user.username)}_`));
    }
    else await interaction.reply({content:`wizzbo needs more info for this enchantment (add a user)`,ephemeral:true});
  },
  failure: async interaction => {
    await interaction.reply({content:fraktur(`wizzbo cannot enchant right now`),ephemeral:true})
  }
}

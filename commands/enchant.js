const { GuildMember } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const fraktur = require('fraktur');

// TODO - /dispel
//   also add an "enchanted ✨" role
//   also add a timer?

module.exports = {
  data: new SlashCommandBuilder()
    .setName('enchant')
    .setDescription('enchant a user ✨')
    // mentionable rather than user, as it gives guild specific info
    .addMentionableOption(option => option.setName('fellow').setDescription('enchant whom?')),
  execute: async (interaction) => {
    const fellow = interaction.options.getMentionable('fellow')

    if(fellow instanceof GuildMember) {
      await interaction.member.guild.members.edit(fellow.user,{nick:fraktur(fellow.nickname || (fellow.user && fellow.user.username))})
      await interaction.reply(fraktur(`wizzbo has enchanted _${fellow.nickname || (fellow.user && fellow.user.username)}_`));
    }
    else if(fellow) await interaction.reply({content:`wizzbo cannot enchant this (fellow must be a user, not a role)`,ephemeral:true});
    else await interaction.reply({content:`wizzbo needs more info for this enchantment (add a user)`,ephemeral:true});
  },
  failure: async interaction => {
    await interaction.reply({content:fraktur(`wizzbo cannot enchant right now`),ephemeral:true})
  }
}

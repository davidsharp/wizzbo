const { SlashCommandBuilder } = require('@discordjs/builders')
const fraktur = require('fraktur');

const responses = [
  `it is doubtful`,
  `absolutely`,
  `it is unclear to wizzbo`,
  `ask me like you mean it`,
  `look inside yourself to find the answer`,
  `perhaps another has the answer`,
]

const fates = [
  //fated => `wizzbo is unsure of the fate of ${fated}`,
  fated => `the fate of _${fated}_ looks ${fatedAdjectives[Math.floor(Math.random()*fatedAdjectives.length)]}`,
  //fated => `_${fated}_ looks to be...`,
]

const fatedAdjectives = [
  `bleak`,`promising`,`surprising`
]

module.exports = {
  data: new SlashCommandBuilder()
    .setName('scry')
    .setDescription('see the future 🔮')
    .addStringOption(option => option.setName('question').setDescription('what should wizzbo seek?'))
    //.addUserOption(option => option.setName('target').setDescription('Select a user'))
    //.addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
    //.addRoleOption(option => option.setName('muted').setDescription('Select a role'))
    .addMentionableOption(option => option.setName('fate').setDescription('discover the fate of whom?')),
  execute: async interaction => {
    const question = interaction.options.getString('question')
    const fate = interaction.options.getMentionable('fate')

    if(fate)console.log(fate)

    let fated
    if(fate) fated = fate.name || fate.nickname || (fate.user && fate.user.username) || 'fated'

    if(question) await interaction.reply(`_"${question}"_ | wizzbo says "${fraktur(responses[Math.floor(Math.random()*responses.length)])}""`)
    else if(fate) await interaction.reply(fates[Math.floor(Math.random()*fates.length)](fated));
    else await interaction.reply({content:`wizzbo needs more info (add a question or a user)`,ephemeral:true});
  },
}

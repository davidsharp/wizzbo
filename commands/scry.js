const { SlashCommandBuilder } = require('@discordjs/builders')
const fraktur = require('fraktur');

const responses = [
  `it is doubtful`,
  `it is unlikely`,
  `it is likely`,
  `wisdom confirms it`,
  `wizzbo would doubt it`,
  `the answer is as you might expect`,
  `all is not as it seems`,
  `absolutely`,
  `absolutely not`,
  `it is unclear to wizzbo`,
  `it is beyond even wizzbo's understanding`,
  `ask your question again with less doubt`,
  `look within yourself to find the answer`,
  `perhaps another has the answer`,
  `wizzbo distrusts what you would do with this information`,
  `wizzbo has faith that you will find your own answer`,
]

const fates = [
  //fated => `wizzbo is unsure of the fate of _${fated}_`,
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
    .addMentionableOption(option => option.setName('fate').setDescription('discover the fate of whom?')),
  execute: async interaction => {
    const question = interaction.options.getString('question')
    const fate = interaction.options.getMentionable('fate')

    if(fate)console.log(fate)

    let fated
    if(fate) fated = fate.name || fate.nickname || (fate.user && fate.user.username) || 'fated'

    if(question) await interaction.reply(`_"${question}"_ 🔮 wizzbo says "${fraktur(responses[Math.floor(Math.random()*responses.length)])}""`)
    else if(fate) await interaction.reply(`${fraktur(fates[Math.floor(Math.random()*fates.length)](fated))}`);
    else await interaction.reply({content:`wizzbo needs more info (add a question or a user)`,ephemeral:true});
  },
  failure: async interaction => {
    await interaction.reply({content:fraktur(`wizzbo cannot see the future right now`),ephemeral:true})
  }
}

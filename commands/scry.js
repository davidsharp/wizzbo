const { MessageEmbed } = require('discord.js')
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
  //fated => `wizzbo is unsure of the fate of _${fated}_`,
  fated => `the fate of _${fated}_ looks ${fatedAdjectives[Math.floor(Math.random()*fatedAdjectives.length)]}`,
  //fated => `_${fated}_ looks to be...`,
]

const fatedAdjectives = [
  `bleak`,`promising`,`surprising`
]

// inside a command, event listener, etc.
const embed = ({asker,question,response}) => (
  new MessageEmbed()
    .setColor('#fedf00')
    .setAuthor(asker)
    .setDescription(question)
    .addFields(
      { name: '🔮 wizzbo says 🔮', value: response },
    )
    .setTimestamp()
    //.setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png')
)
module.exports = {
  data: new SlashCommandBuilder()
    .setName('scry')
    .setDescription('see the future 🔮')
    .addStringOption(option => option.setName('question').setDescription('what should wizzbo seek?'))
    .addMentionableOption(option => option.setName('fate').setDescription('discover the fate of whom?')),
  execute: async (interaction,{client}) => {
    const question = interaction.options.getString('question')
    const fate = interaction.options.getMentionable('fate')

    const channel = await client.channels.fetch(interaction.channelId)

    console.log(channel)

    let fated
    if(fate) fated = fate.name || fate.nickname || (fate.user && fate.user.username) || 'fated'

    if(question) channel.send({ embeds: [embed({asker:'anonymous',question,response:fraktur(responses[Math.floor(Math.random()*responses.length)])})] });
    //await interaction.reply(`_"${question}"_ 🔮 wizzbo says "${fraktur(responses[Math.floor(Math.random()*responses.length)])}""`)
    else if(fate) await interaction.reply(`${fraktur(fates[Math.floor(Math.random()*fates.length)](fated))}`);
    else await interaction.reply({content:`wizzbo needs more info (add a question or a user)`,ephemeral:true});
  },
}

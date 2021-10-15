const { SlashCommandBuilder } = require('@discordjs/builders')

const setupvote = {
  data: new SlashCommandBuilder()
    .setName('setupvote')
    .setDescription('sets up an anonymous poll `/vote` to participate')
    .addIntegerOption(option => option.setName('players').setDescription('how many people are voting?').setRequired(true))
    .addIntegerOption(option => option.setName('stories').setDescription('how many items to vote from?').setRequired(true))
    .addIntegerOption(option => option.setName('votes').setDescription('[optional, default:2] how many votes per person?')),
  execute: async interaction => {
    const players = interaction.options.getInteger('players')
    const stories = interaction.options.getInteger('stories')
    const votes = (interaction.options.getInteger('votes') || 2)

    await interaction.reply({content:`wizzbo needs more info (add a question or a user)`,ephemeral:true});
  }
}

// provide a way to return results without the vote "finishing"
const endvote = {
  data: new SlashCommandBuilder()
    .setName('endvote')
    .setDescription('ends anonymous poll, and returns results'),
  execute: ()=>{}
}

const vote = {
  data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('anonymously vote in the current poll')
    .addStringOption(option => option.setName('vote').setDescription('vote in the current poll').setRequired(true)),
  execute: async interaction => {
    const vote = interaction.options.getInteger('vote')

    // TODO - say how many votes are left
    await interaction.reply({content:fraktur(`Thanks, you voted for ${vote}`),ephemeral:true})
  }
}

// TODO, check number of votes
const votestatus = {}

module.exports = { vote, setupvote, endvote }

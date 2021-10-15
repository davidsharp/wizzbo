const { SlashCommandBuilder } = require('@discordjs/builders')

// rough placeholder storage
let poll = {}

const setupvote = {
  data: new SlashCommandBuilder()
    .setName('setupvote')
    .setDescription('sets up an anonymous poll `/vote` to participate')
    .addIntegerOption(option => option.setName('players').setDescription('how many people are voting?').setRequired(true))
    .addIntegerOption(option => option.setName('entries').setDescription('how many items to vote from?').setRequired(true))
    .addIntegerOption(option => option.setName('votes').setDescription('[optional, default:2] how many votes per person?'))
    .addBooleanOption(option => option.setName('weighted').setDescription('[optional, default:false] are votes weighted (or worth equal)?')),
  execute: async interaction => {
    const players = interaction.options.getInteger('players')
    const entries = interaction.options.getInteger('entries')
    const votes = (interaction.options.getInteger('votes') || 2)
    const weighted = !!interaction.options.getBoolean('weighted')
    const { guildId } = interaction

    poll = {players,entries,votes,weighted,guildId}

    console.log(poll)

    await interaction.reply({content:`[Input test:] players (${players}), entries (${entries}), votes (${votes}), weighted (${weighted})`,ephemeral:true});
  }
}

// provide a way to return results without the vote "finishing"
const endvote = {
  data: new SlashCommandBuilder()
    .setName('endvote')
    .setDescription('ends anonymous poll, and returns results'),
  execute: async ()=>{
    await interaction.reply({content:`vote ended [TODO: show results]`})
  }
}

const vote = {
  data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('anonymously vote in the current poll')
    .addIntegerOption(option => option.setName('vote').setDescription('vote in the current poll').setRequired(true)),
  execute: async interaction => {
    const vote = interaction.options.getInteger('vote')

    console.log(interaction.user,interaction.guildId)

    if(!poll.voters)poll.voters = {}

    if(!poll.voters[interaction.user]) poll.voters[interaction.user] = []

    poll.voters[interaction.user].push(vote)

    console.log(poll)

    // TODO - say how many votes are left
    await interaction.reply({content:`Thanks, you voted for ${vote}, you have ${poll.votes-poll.voters[interaction.user].length} votes left`,ephemeral:true})
  }
}

// TODO, check number of votes
const votestatus = {}

module.exports = { vote, setupvote, endvote }

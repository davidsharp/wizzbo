const { SlashCommandBuilder } = require('@discordjs/builders')

// rough placeholder storage
let poll = {}

// functions
const initPoll = ({players,entries,votes,weighted,guildId}) => {
  poll = {players,entries,votes,weighted,guildId}
}

const pollComplete = poll => {
  const results = Object.values(poll.voters).reduce(
    (acc,votes)=>{
      votes.forEach(
        (c,i)=>{
          if(!acc[c])acc[c]==0
          if(poll.weighted) acc[c]++ // TODO - handle weighting
          else acc[c]++
        }
      )
      return acc
    },
    {}
  )
  const ranking = Object.entries(results).sort((a,b)=>b[1]-a[1])
  return `The votes are in!
The winner is entry ${ranking[0][0]}!`
}

// slash commands
const setupvote = {
  data: new SlashCommandBuilder()
    .setName('setupvote')
    .setDescription('sets up an anonymous poll `/vote` to participate')
    .addIntegerOption(option => option.setName('players').setDescription('how many people are voting?').setRequired(true))
    .addIntegerOption(option => option.setName('entries').setDescription('how many items to vote from?').setRequired(true))
    .addIntegerOption(option => option.setName('votes').setDescription('[optional, default:3] how many votes per person?'))
    .addBooleanOption(option => option.setName('weighted').setDescription('[optional, default:false] are votes weighted (or worth equal)?')),
  execute: async interaction => {
    const players = interaction.options.getInteger('players')
    const entries = interaction.options.getInteger('entries')
    const votes = (interaction.options.getInteger('votes') || 3)
    const weighted = !!interaction.options.getBoolean('weighted')
    const { guildId } = interaction

    initPoll({players,entries,votes,weighted,guildId})

    console.log(poll)

    //await interaction.reply({content:`[Input test:] players (${players}), entries (${entries}), votes (${votes}), weighted (${weighted})`,ephemeral:true});
    await interaction.reply({content:`A poll has been created, please vote from 1-${entries}, you have ${votes} vote(s)${weighted && votes>1?', please vote starting with your highest':''}`});
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
    .addIntegerOption(option => option.setName('vote').setDescription('vote in the current poll').setRequired(true))
    //.addIntegerOption(option => option.setName('place').setDescription('position to be voted for'))
    ,
  execute: async interaction => {
    const vote = interaction.options.getInteger('vote')

    console.log(interaction.user,interaction.guildId)

    if(!poll.voters)poll.voters = {}

    if(!poll.voters[interaction.user]) poll.voters[interaction.user] = []

    poll.voters[interaction.user].push(vote)

    if(!poll.votesCast) poll.votesCast = 0
    poll.votesCast++

    console.log(poll)

    // TODO - handle repeat votes for the same person

    await interaction.reply({content:`Thanks, you voted for ${vote}, you have ${poll.votes-poll.voters[interaction.user].length} votes left`,ephemeral:true})
    if(poll.votesCast == poll.players * poll.votes) await interaction.followUp({content:pollComplete(poll),ephemeral:false})
  }
}

// TODO, check number of votes
const votestatus = {}

module.exports = { vote, setupvote, endvote }

const { SlashCommandBuilder } = require('@discordjs/builders')

const path = require('path')
const Storage = require('node-storage')
const store = new Storage(path.resolve(__dirname,'..','poll_storage',`store.json`))

// functions
const initPoll = ({players,entries,votes,weighted,guildId,channelId}) => {
  const polls = store.get(guildId) || {}
  polls[channelId] = {players,entries,votes,weighted,guildId,channelId}
  store.put(guildId,polls)
}

const pollComplete = poll => {
  const results = Object.values(poll.voters).reduce(
    (acc,votes)=>{
      votes.forEach(
        (c,i)=>{
          if(!acc[c])acc[c]=0
          if(poll.weighted) acc[c]++ // TODO - handle weighting
          else acc[c]++
        }
      )
      return acc
    },
    {}
  )
  const rankings = calculateRankings(results)
  let resultText = 'The votes are in!\n'
  resultText += (rankings[0].entries.length===1?
    `The winner is entry ${rankings[0].entries[0]} with ${rankings[0].votes} points`:
    `Tied for 1st place with ${rankings[0].votes} points each are entries ${
      rankings[0].entries.slice(0,-1).join(', ')
    } and ${
      rankings[0].entries[rankings[0].entries.length-1]
    }`
  )
  return resultText
}

const pollStatus = poll => {
  return `Current poll status:
${Object.keys(poll.voters).length}/${poll.players} people have voted
${poll.votesCast} vote(s) have been cast${poll.ended?`
This poll has ended`:''}`
}

const calculateRankings = results => {
  const sortedResults = Object.entries(results).sort((a,b)=>b[1]-a[1])
  const places = []
  sortedResults.forEach((r,i,a)=>{
    if(places.length == 0) places.push({votes:r[1],entries:[r[0]]})
    else if(r[1]==places[places.length-1].votes) places[places.length-1].entries.push(r[0])
    else places.push({votes:r[1],entries:[r[0]]})
  })
  return places
}

// slash commands
const setupvote = {
  subcommand: subcommand => subcommand
    .setName('setup')
    .setDescription('sets up an anonymous poll `/vote cast` to participate')
    .addIntegerOption(option => option.setName('players').setDescription('how many people are voting?').setRequired(true))
    .addIntegerOption(option => option.setName('entries').setDescription('how many items to vote from?').setRequired(true))
    .addIntegerOption(option => option.setName('votes').setDescription('[optional, default:3] how many votes per person?'))
    .addBooleanOption(option => option.setName('weighted').setDescription('[optional, default:false] are votes weighted (or worth equal)?')),
  execute: async interaction => {
    const players = interaction.options.getInteger('players')
    const entries = interaction.options.getInteger('entries')
    const votes = (interaction.options.getInteger('votes') || 3)
    const weighted = !!interaction.options.getBoolean('weighted')
    const { guildId, channelId } = interaction

    initPoll({players,entries,votes,weighted,guildId,channelId})

    await interaction.reply({content:`A poll has been created, please vote from 1-${entries}, you have ${votes} vote(s)${weighted && votes>1?', please vote starting with your highest':''}`});
  }
}

// provide a way to return results without the vote "finishing"
const endvote = {
  subcommand: subcommand => subcommand
    .setName('end')
    .setDescription('ends anonymous poll, and returns results'),
  execute: async interaction => {
    const polls = store.get(interaction.guildId) || {}
    // TODO - actually end poll, don't allow any more votes
    polls[interaction.channelId].ended = true
    store.put(interaction.guildId,polls)
    await interaction.reply({content:pollComplete(polls[interaction.channelId])})
  }
}

const castvote = {
  subcommand: subcommand => subcommand
    .setName('cast')
    .setDescription('anonymously vote in the current poll')
    .addIntegerOption(option => option.setName('entry').setDescription('vote in the current poll').setRequired(true))
    //.addIntegerOption(option => option.setName('place').setDescription('position to be voted for'))
    ,
  execute: async interaction => {
    const vote = interaction.options.getInteger('entry')

    const poll = store.get(`${interaction.guildId}.${interaction.channelId}`) || {}

    console.log(interaction.user,interaction.guildId)

    if(!poll.voters)poll.voters = {}

    if(!poll.voters[interaction.user]) poll.voters[interaction.user] = []

    if(false && poll.voters[interaction.user].includes(vote)){
      await interaction.reply({content:`Sorry, you've already voted for ${vote}. Please vote for a different entry, you have ${poll.votes-poll.voters[interaction.user].length} vote(s) left`,ephemeral:true})
    } else{
      poll.voters[interaction.user].push(vote)

      if(!poll.votesCast) poll.votesCast = 0
      poll.votesCast++

      const finalVote = poll.votesCast == poll.players * poll.votes
      if(finalVote) poll.ended = true

      store.put(`${interaction.guildId}.${interaction.channelId}`,poll)

      await interaction.reply({content:`Thanks, you voted for ${vote}, you have ${poll.votes-poll.voters[interaction.user].length} vote(s) left`,ephemeral:true})
      if(finalVote) await interaction.followUp({content:pollComplete(poll),ephemeral:false})
    }

    
  }
}

const votestatus = {
  subcommand: subcommand => subcommand
    .setName('status')
    .setDescription('get current poll status'),
  execute: async interaction => {
    const polls = store.get(interaction.guildId) || {}
    await interaction.reply({content:pollStatus(polls[interaction.channelId]),ephemeral:true})
  }
}

const vote = {
  data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('poll stuff')
    .addSubcommand(castvote.subcommand)
    .addSubcommand(setupvote.subcommand)
    .addSubcommand(votestatus.subcommand)
    .addSubcommand(endvote.subcommand),
    //.addSubcommandGroup() //'manage' as a separate group?
  execute: async interaction => {
    const subcommand = interaction.options.getSubcommand()
    console.log(subcommand)
    let command
    switch(subcommand){
      case 'cast': command = castvote; break;
      case 'status': command = votestatus; break;
      case 'end': command = endvote; break;
      case 'setup': command = setupvote; break;
    }
    if(command) await command.execute(interaction)
  }
}

// todo, turn into subcommands?
module.exports = vote

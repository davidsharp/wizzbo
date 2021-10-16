const { Collection } = require('discord.js')

const Vote = require('./vote')

const commands = [
  Vote
]

const collection = new Collection()
commands.forEach(
  c => collection.set(c.data.name, c)
)

module.exports = {commands:commands.map(c=>c.data.toJSON()), collection}

const { Collection } = require('discord.js')

const Ping = require('./ping')
const ServerInfo = require('./serverInfo')
const UserInfo = require('./userInfo')
const Scry = require('./scry')
const Vote = require('./vote')
const FlagRole = require('./flag-role')

const commands = [
  Ping,
  Scry,
  ServerInfo,
  UserInfo,
  Vote,
  FlagRole,
]

const collection = new Collection()
commands.forEach(
  c => collection.set(c.data.name, c)
)

module.exports = {commands:commands.map(c=>c.data.toJSON()), collection}

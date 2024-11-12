import { Collection } from 'discord.js'

import Ping from './ping.js'
import ServerInfo from './serverInfo.js'
import UserInfo from './userInfo.js'
import Scry from './scry.js'
import Vote from './vote.js'

const commands = [
  Ping,
  Scry,
  ServerInfo,
  UserInfo,
  Vote
]

const collection = new Collection()
commands.forEach(
  c => collection.set(c.data.name, c.data.toJSON())
)

export {commands, collection}

// run express web app server
import './webserver.js'

import { readFileSync } from 'fs'

import { collection } from './commands/index.js'
import createClient from './createClient.js'

let config
try {
  config = JSON.parse(readFileSync('./config.json'))
}catch(e){
  console.log('No config.json, using process.env')
  config = process.env
}

createClient({name:'wizzbo',config,collection})
if(config.kwivo)createClient({name:'kwivo',config:typeof config.kwivo == 'string'?JSON.parse(config.kwivo):config.kwivo,collection})

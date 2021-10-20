// run express web app server
require('./webserver')

let config
try {
  config = JSON.parse(require('fs').readFileSync('./config.json'))
}catch(e){
  console.log('No config.json, using process.env')
  config = process.env
}

const { collection } = require('./commands')

const createClient = require('./createClient')

createClient({name:'wizzbo',config,collection})
//createClient({name:'kwivo',config,collection})

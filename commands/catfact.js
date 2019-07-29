const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'catfact',
  description: 'Returns a random cat fact pulled from api call',
  async execute(msg, args) {
    const body = await fetch('https://catfact.ninja/fact?max_length=1000').then(response => response.json());

    msg.channel.send(body.fact)
  }
}

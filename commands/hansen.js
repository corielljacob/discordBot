const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'hansen',
  description: 'Sends Hansen',
  async execute(msg, args) {
    client = new Discord.Client();
    client.channels.get("661803881549791251").send("If this sends, hansen is coming asap")
  }
}

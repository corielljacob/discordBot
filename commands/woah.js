const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'woah',
  description: 'Sends Hansen?',
  async execute(msg, args) {
    setInterval(function(){
    if(1==1)
      {
        msg.client.channels.get('537142011455733770').send('Touchez votre nez :nose:');
      }
    }, 1000 * 90)
  }
}

const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
module.exports = {
  name: 'meme',
  description: 'Sends a random meme from API call',
  async execute(msg, args) {
    const body = await fetch('https://meme-api.herokuapp.com/gimme').then(response => response.json());
    //const url = body.url
    //const webAttachment = new Discord.Attachment(url)
    const attachment = new Discord.MessageAttachment(url);
    msg.channel.send(attachment)
  },
};

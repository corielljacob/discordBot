const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
module.exports = {
  name: 'apod',
  description: 'Gets the Astronomy Picture of the Day',
  async execute(msg, args) {
    const body = await fetch('https://api.nasa.gov/planetary/apod?api_key=AwI0QgICSCF7kcvxQhO6HxjsS9igsBsfrLXkGEAZ', {
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => response.json());
    const attachment = new Discord.MessageAttachment(body.hdurl)
    msg.channel.send(attachment)
    msg.channel.send(body.explanation)
  },
};

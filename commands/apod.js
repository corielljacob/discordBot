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
    const apodEmbed = new Discord.MessageEmbed()
      .setColor('#c914cf')
      .setTitle(`${body.title}`)
      .setURL(body.url)
      .setAuthor(`Astronomy Picture of the Day by NASA - ${body.date}`)
      .setDescription(body.explanation)
      .setImage(body.hdurl)
    msg.channel.send(apodEmbed)
  },
};

const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'woah',
  description: 'Sends Hansen?',
  async execute(msg) {
    var num = util.getRandomInt(3);
    console.log(num);
    if(num == 1 || num == 2) return;

    var webAttachment = new Discord.Attachment("https://vignette.wikia.nocookie.net/to-catch-a-predator/images/2/29/6b7f722f-750a-45d8-aca4-d3db587ded7f.jpg")
    msg.client.channels.get('537142011455733770').send(webAttachment);
    msg.client.channels.get('537142011455733770').send("Why dont you take a seat...");
  }
}

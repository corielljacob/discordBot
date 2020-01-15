const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'woah',
  description: 'Sends Hansen?',
  async execute(msg, args) {
    var val = 1;
    setInterval(function(){
    if(1==1)
      {
        val = util.getRandomInt(5);
        var webAttachment = new Discord.Attachment("https://vignette.wikia.nocookie.net/to-catch-a-predator/images/2/29/6b7f722f-750a-45d8-aca4-d3db587ded7f.jpg")
        msg.client.channels.get('537142011455733770').send(webAttachment);
        msg.client.channels.get('537142011455733770').send("Why dont you take a seat...");
      }
    }, 1000 * (60*util.getRandomInt(5)))
  }
}

const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'hansen',
  description: 'Sends Hansen?',
  async execute(msg) {
    var num = util.getRandomInt(3);
    console.log(num);
    if(num == 1 || num == 2)
    return;

    const attachment = new Discord.Attachment('./assets/hansens/finalHansen' + '.png');
    msg.client.channels.get('661803881549791251').send(attachment);
    msg.client.channels.get('661803881549791251').send("Why dont you take a seat...");
  }
}

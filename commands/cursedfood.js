const Discord = require('discord.js');
const config = require('../config.json')
module.exports = {
  name: 'cursedfood',
  description: 'Displays a random picture of cursed food',
  execute(msg, args) {
    const num = this.getRandomInt(config.food_size);
    const attachment = new Discord.Attachment('./assets/images/img' + num + '.png', 'img' + num + '.png');
    msg.channel.send(attachment)
  },
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}

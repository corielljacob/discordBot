const Discord = require('discord.js');
const config = require('../config.json')
const util = require('../utility.js')
module.exports = {
  name: 'cursedfood',
  description: 'Displays a random picture of cursed food',
  execute(msg, args) {
    const num = util.getRandomInt(config.food_size);
    const attachment = new Discord.MessageAttachment('./assets/images/img' + num + '.png', 'img' + num + '.png');
    msg.channel.send(attachment)
  },
}

const Discord = require('discord.js');
const config = require('../config.json')
module.exports = {
  name: 'cursedfood#',
  description: 'Displays a specific picture of cursed food. Put a space between the # and desired number.\n Ex: w!cursedfood# 5',
  execute(msg, args) {
    var num = parseInt(args.shift());
    if (num < 0 || num > config.food_size - 1) {
      msg.channel.send("Retry the command with a number between 0 and " + config.food_size - 1)
    } else {
      const attachment = new Discord.MessageAttachment('./assets/images/img' + num + '.png', 'img' + num + '.png');
      msg.channel.send(attachment)
    }
  }
}

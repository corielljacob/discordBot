const Discord = require('discord.js');
const config = require('../config.json')
module.exports = {
  name: 'role',
  description: 'Displays color of highest role',
  execute(msg, args) {
    const user = msg.member
    msg.channel.send(user.colorRole.hexColor)
  }
}

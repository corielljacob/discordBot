const Discord = require('discord.js');
const config = require('../config.json')
module.exports = {
  name: 'setcolor#',
  description: 'Changes color of highest role. Put a space between # and hex value for color',
  execute(msg, args) {
    var hexColor = args.shift()
    if (hexColor.length != 6) {
      msg.channel.send('Enter a valid hex color')
    } else {
      const user = msg.member
      const role = user.colorRole
      if (role == null) {
        msg.channel.send('please @ jacob, theres a problem with the bot')
      } else {
        role.setColor('#' + hexColor)
        msg.channel.send('Set color of role to #' + hexColor)
      }
    }
  }
}

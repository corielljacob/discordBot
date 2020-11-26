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
      const role = user.roles.color
      if (role == null) {
        const cob = msg.client.users.cache.get('206236812916555776');
        msg.channel.send(`Cannot execute. ${cob} help ${user}`)
      } else {
        role.setColor('#' + hexColor)
        msg.channel.send('Set color of role to #' + hexColor)
      }
    }
  }
}

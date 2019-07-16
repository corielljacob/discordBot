const Discord = require('discord.js');
const config = require('../config.json')
module.exports = {
  name: 'speak',
  description: 'Stops bot from deleting messages from specified user',
  execute(msg, args) {
    const user = msg.mentions.members.first()
    if (user.roles.has('598342371037544470')) {
      user.removeRole('598342371037544470')
      msg.channel.send(`${user} u can speak now`)
    } else {
      msg.channel.send('they can already speak dumbass')
    }
  }
}

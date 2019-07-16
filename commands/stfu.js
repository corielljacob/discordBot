const Discord = require('discord.js');
const config = require('../config.json')
module.exports = {
  name: 'stfu',
  description: 'Deletes messages from user mentioned until the speak command is used on the user.',
  execute(msg, args) {
    const user = msg.mentions.members.first()
    user.addRole('598342371037544470')
    msg.channel.send(`${user} shut the fuck up`)
  }
}

const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
  name: 'purge',
  description: 'Delete a specified number of messages',
  execute(msg, args) {
    msg.channel.bulkDelete(args[0])
      .catch(console.error) {
        msg.channel.send("error")
      }
  }
}

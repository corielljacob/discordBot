const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
  name: 'purge',
  description: 'Delete a specified number of messages',
  execute(msg, args) {
    if(Number.isInteger(args[0] && args[0] > 0))
      msg.channel.bulkDelete(args[0])
    else
      msg.channel.send("Please provide a valid number of messages to delete.")
  }

}

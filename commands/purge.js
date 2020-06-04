const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
  name: 'purge',
  description: 'Delete a specified number of messages',
  execute(msg, args) {
    try{
      msg.channel.bulkDelete(args[0])
    }
    catch(err){
      msg.channel.send("Please enter a valid number of messages to delete")
    }
  }
}

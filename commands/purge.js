const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
  name: 'purge',
  description: 'Delete a specified number of messages',
  execute(msg, args) {
    try{
      if(parseInt(args[0]) < 0){
        msg.channel.send("Please enter a valid number of messages to delete")
        return
      }
      msg.channel.bulkDelete(args[0])
    }
    catch(err){
      msg.channel.send("Please enter a valid number of messages to delete")
    }
  }
}

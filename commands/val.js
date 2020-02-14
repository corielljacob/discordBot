const Discord = require('discord.js');
const config = require('../config.json')
const util = require('../utility.js')
module.exports = {
  name: 'val',
  description: 'Send a valentine by @ing a user',
  execute(msg, args) {
    if(args.length == 0){
      msg.channel.send("Please @ a user!")
      return;
    }
    const num = util.getRandomInt(40)
    const attachment = new Discord.Attachment('./assets/valentines/img' + num + '.jpg', 'img' + num + '.jpg')
    const user = msg.mentions.users.first()
    msg.channel.send(`To: ${user}\nFrom: ${msg.author}` + attachment)
  },
}

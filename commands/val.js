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
    const user = msg.mentions.users.first()
    if(user.id === '206693327268085760'){
      const attachment = new Discord.MessageAttachment('./assets/valentines/img40.jpg', 'img' + '40' + '.jpg')
      msg.channel.send(`To: ${user}\nFrom: ${msg.author}`)
      msg.channel.send(attachment)
    }else if(user.id === '443660815346696213'){
      const attachment = new Discord.MessageAttachment('./assets/valentines/img41.jpg', 'img' + '41' + '.jpg')
      msg.channel.send(`To: ${user}\nFrom: ${msg.author}`)
      msg.channel.send(attachment)
    }else{
    const num = util.getRandomInt(39)
    const attachment = new Discord.MessageAttachment('./assets/valentines/img' + num + '.jpg', 'img' + num + '.jpg')
    msg.channel.send(`To: ${user}\nFrom: ${msg.author}`)
    msg.channel.send(attachment)
  }
  },
}

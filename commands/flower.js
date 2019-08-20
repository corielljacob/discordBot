const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
    name: 'flower',
    description: 'Display a random flower and prompt user for name of flower.',
    names: ["buttercup","daffodil","daisy", "nettle","poppy","snowdrop","thistle","tulip","whiteclover"],
    execute(msg, args) {
      const flowername = this.names[util.getRandomInt(this.names.length)]
      const index = util.getRandomInt(3)
      const attachment = new Discord.Attachment('./assets/flowers/'+flowername+'/img' + index + '.png', 'img' + index + '.png')
      msg.channel.send(attachment)
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
        time: 10000
      });
      collector.on('collect', message => {
          if (message.content == "See")
            message.channel.send("You Want To See Someones Spec OK!");
        });
      }
    };

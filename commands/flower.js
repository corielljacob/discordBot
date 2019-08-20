const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
  name: 'flower',
  description: 'Display a random flower and prompt user for name of flower.',
  names: ["buttercup", "daffodil", "daisy", "nettle", "poppy", "snowdrop", "thistle", "tulip", "whiteclover"],
  execute(msg, args) {
    const flowername = this.names[util.getRandomInt(this.names.length)]
    const index = util.getRandomInt(3)
    const attachment = new Discord.Attachment('./assets/flowers/' + flowername + '/img' + index + '.png', 'img' + index + '.png')
    msg.channel.send(attachment)
    const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, {
      time: 10000
    });
    collector.on('collect', message => {
      if (message.content == flowername) {
        message.channel.send("Correct! That is " + flowername);
      } else {
        message.channel.send("Incorrect! That is " + flowername);
      }
      return;
    });
    collector.on('end', collected => {
      msg.channel.send("You did not answer. That was " + flowername)
    }
  }
};

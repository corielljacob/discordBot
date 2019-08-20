const util = require('../utility.js')
module.exports = {
    name: 'flower',
    description: 'Display a random flower and prompt user for name of flower.',
    execute(msg, args) {
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
        time: 10000
      });
      collector.on('collect', message => {
          if (message.content == "See") {
            message.channel.send("You Want To See Someones Spec OK!");
          } else if (message.content == "Change") {
            message.channel.send("You Want To Change Your Spec OK!");
          }
        }
      };

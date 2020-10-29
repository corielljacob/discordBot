const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
  name: 'regurg',
  description: 'Regurgitate from some random number of messages',
  execute(msg, args) {

    let msgs = util.getRandomInt(6) + 1;

    const chnl = msg.channel;
    channel.messages.fetch({limit: msgs})
      .then(msgs => msg.channel.send(`Pulled ${msgs.size} messages`))
      .catch(console.error);
  }
}

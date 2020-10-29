const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
  name: 'regurg',
  description: 'Regurgitate from some random number of messages',
  execute(msg, args) {

    let msgs = util.getRandomInt(6) + 1;

    let chnl = msg.channel;
    let msgHistory;
    chnl.messages.fetch({limit: msgs})
      .then(msgCollection => msgCollection.forEach(this.testMethod(msg)));

  },
  testMethod() {
    msg.channel.send('TypeScript');
  }
}

const util = require('../utility.js')
module.exports = {
  name: 'confession',
  description: 'Sends an anonymous confession to the confession channel',
  execute(msg, args) {
    msg.channel.send('DM the bot text to make a confession.')
  }
};

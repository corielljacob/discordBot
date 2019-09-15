const util = require('../utility.js')
module.exports = {
  name: 'roll',
  description: 'Rolls for separate discord bot',
  execute(msg, args) {
    msg.channel.send("$help")
  }
};

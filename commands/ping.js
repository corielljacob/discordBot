const util = require('../utility.js')
module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(message, args) {
    message.channel.send('**Pong.**');
    console.log(util.getRandomInt(5))
  },
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
};

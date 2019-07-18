const config = require('../config.json');
module.exports = {
  name: 'help',
  description: 'Shows useable commands and other info',
  execute(msg, args) {
    msg.channel.send('Current Prefix: ' + config.prefix + '\nCurrent usable commands: ping, roast, leek, thomas, thomas2, raven, tobi, anie, jacob, james, bentley, nick, erin, \ncursedfood, cursedfood#, stfu , speak , role, setcolor#, dm' + '\nDM the bot a picture to change your name command pic')
  },
};

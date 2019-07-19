const config = require('../config.json');
module.exports = {
  name: 'help',
  description: 'Shows useable commands and other info',
  execute(msg, args) {
    const data = []
    const { commands } = msg.client;
    data.push(commands.map(command => command.name).join(', '));
    msg.channel.send('Current Prefix: ' + config.prefix + '\nCommands:'+data)
  },
};

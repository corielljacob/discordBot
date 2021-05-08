const config = require('../config.json');
module.exports = {
  name: 'help',
  description: 'Shows useable commands and other info',
  execute(msg, args) {
    const data = [];
    const { commands } = msg.client;
    if(!args.length) {
      data.push(commands.map(command => command.name).join(', '));
      msg.channel.send('Current Prefix: ' + config.prefix + '\nCommands: '+data);
      return;
    }

    const commandName = args[0].toLowerCase();
    const command = commands.get(commandName);

    if (!command) {
	     return message.reply('That\'s not a valid command.');
    }

    data.push(`**Name:** ${command.name}`);
    if (command.description) data.push(`**Description:** ${command.description}`);
    if (command.usage) data.push(`**Usage:** ${config.prefix}${command.name} ${command.usage}`);
    msg.channel.send(data, { split: true });

  },
};

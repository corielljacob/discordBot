const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.channel.send('testing')
    //testing3

  }
});

client.on('message', msg => {
  if (msg.content === 'jacob is a dodo') {
    msg.channel.send('no u')
  }
});

client.on('message', msg => {
  if (msg.content === 'raven is a dodo') {
    msg.channel.send('yes she is')
  }
});

client.on('message', msg => {
  if (msg.content === 'bye') {
    msg.channel.send('cya')
  }
});

client.login(process.env.BOT_TOKEN);

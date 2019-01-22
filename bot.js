const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    const channel = client.channels.find('name', 'general')
    channel.send('raven is a dodo')
    //testing

  }
});

client.on('message', msg => {
  if (msg.content === 'jacob is a dodo') {
    msg.reply('no u')
  }
});

client.on('message', msg => {
  if (msg.content === 'smh') {
    msg.reply('shake so much and itll fall off')
  }
});


client.on('message', msg => {
  if (msg.content === 'raven is a dodo') {
    msg.reply('yup')
  }
});

client.on('message', msg => {
  if (msg.content === 'bye') {
    msg.reply('cya')
  }
});

client.login(process.env.BOT_TOKEN);

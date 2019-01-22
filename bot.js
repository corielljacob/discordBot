const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = 'w!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//send a pong reply when user types ping with specified prefix: in this code it is 'w!'
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'ping') {
    msg.channel.send('pong')
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'jacob is a dodo') {
    msg.channel.send('no u')
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'raven is a dodo') {
    msg.channel.send('yes she is')
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bye') {
    msg.channel.send('cya')
  }
});

//Send a message in a specific channel identified by its ID (obtained from discord developer appearance)
client.on('message', msg => {
  if (msg.content.toLowerCase() === '+1') {
    client.channels.get('447604006584451092').send('1')
  }
});

//testing for development of possible command that will vary by some number entered after the word roast
client.on('message', msg => {
  if (msg.content.toLowerCase().includes(prefix + 'roast')) {
    try {
      const numb = msg.content.substring(8,9)
    }
    catch(err) {
      msg.channel.send('Incorrect format. Use a number 1-9.')
    }
  }
});


client.login(process.env.BOT_TOKEN);

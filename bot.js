const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'ping') {
    msg.channel.send('testing')
    //testing3

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

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'post') {
    client.channels.get('447604006584451092').send('20')
  }
});

/*client.on('message', msg => {
  if (msg.content === '+1') {
    client.get_message(447604006584451092, 537300865749483540).edit(' +1')
  }
});*/

client.login(process.env.BOT_TOKEN);

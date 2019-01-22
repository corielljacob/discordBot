const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = 'w!';
var roasts = ["commit neck rope please", "you should've been thrown in the harbor with the tea", "cunt", "bitch", "prick", "die", "frick u", "u suck",
              "subscribe to pewdiepie"];

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
    const user = msg.mentions.users.first()
    if (typeof user === "undefined") {
      msg.channel.send("No user found.")
    } else {
      //msg.channel.send(`hello ${user}`)
      msg.channel.send(`${user} ` + roasts[getRandomInt(roasts.length)] )
    }
  }
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

client.login(process.env.BOT_TOKEN);

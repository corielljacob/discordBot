const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = 'w!';


var roasts = ["commit neck rope please", "you should've been thrown in the harbor with the tea", "cunt", "bitch", "prick", "die", "frick u", "u suck",
  "subscribe to pewdiepie", "you probably say 'big mood' unironically", "I hope your family gets carried away by ants.",
  "ur mom gay", "ur dad lesbian", "ur granny tranny", "ur family tree lgbt", "do u even think before speaking", "ur mom should have swallowed",
  "dont fuck with me; I have the power of GOD and ANIME on my side", "dont ever @ me again", "your mother smells of elderberries",
  "your mother was a hamster and your father smelt of elderberries", "skidaddle skidoodle your dick is now a noodle", "please delete yourself",
  "you are a piece of chet please log off ethernet", "you probably say 'big tea' unironically", "go commit toaster bath", "no u", "go commit toaster bath",
  "Hypothetically though I don’t want you dead", "bentley doesnt love u", "leonardo da binchi", "thomas is gunna ban your ass", "born villain",
  "you probably like being pissed on like lode", "you probably think foot jobs are grosser than eating ass"];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('ready', () => {
  client.user.setActivity("w!help --> commands")
})

//command list
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'ping') {
    msg.channel.send('pong')
  } else if (msg.content.toLowerCase() === 'jacob is a dodo') {
    msg.channel.send('no u')
  } else if (msg.content.toLowerCase() === 'raven is a dodo') {
    msg.channel.send('yes she is')
  } else if (msg.content.toLowerCase() === 'bye') {
    msg.channel.send('cya')
  } else if (msg.content.toLowerCase() === '+1') {
    client.channels.get('447604006584451092').send('1')
  } else if (msg.content.toLowerCase().includes(prefix + 'roast') && !(msg.content.toLowerCase().includes(prefix + 'roast2'))) {
    if (!msg.mentions.users.size) {
      return msg.channel.send('You need to specify a correct user.')
    }
    const user = msg.mentions.users.first()
    msg.channel.send(`${user} ` + roasts[getRandomInt(roasts.length)])
  } else if (msg.content.toLowerCase().includes(prefix + 'roast2')) {
    if (!msg.mentions.users.size) {
      return msg.channel.send('You need to specify a correct user.')
    }
    const dblkill = msg.mentions.users.map(user => {
      return `${user} ` + roasts[getRandomInt(roasts.length)];
    });
    msg.channel.send(dblkill)
  } else if (msg.content.toLowerCase() === prefix + 'help') {
    msg.channel.send('Current Prefix: ' + prefix)
    msg.channel.send('Current usable commands: roast, roast2, ping, leek, thomas, raven, tobi, anie, jacob, bentley')
  } else if (msg.content.toLowerCase() === prefix + 'leek') {
    msg.channel.send('Leeks are different than green onions.')
  } else if (msg.content.toLowerCase() === prefix + 'hentai' || msg.content.toLowerCase() === prefix + 'furry') {
    msg.channel.send('Fuck that dumb shit.')
  } else if (msg.content.toLowerCase() === prefix + 'thomas') {
    webAttachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/450090478524825610/537433419307679754/DuJgA_jX4AICKp4.png')
    msg.channel.send(webAttachment)
  } else if (msg.content.toLowerCase() === prefix + 'raven') {
    webAttachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/445658785340456965/536339338296950796/Screenshot_2019-01-14-13-08-06.png')
    msg.channel.send(webAttachment)
  } else if (msg.content.toLowerCase() === prefix + 'tobi') {
    webAttachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/346028466434473986/538020297929130004/image0.jpg')
    msg.channel.send(webAttachment)
  } else if (msg.content.toLowerCase() === prefix + 'anie') {
    webAttachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/512994325743927325/537432388951867393/image0.jpg')
    msg.channel.send(webAttachment)
  } else if (msg.content.toLowerCase() === prefix + 'bentley') {
    webAttachment = new Discord.Attachment('https://media.discordapp.net/attachments/537142011455733770/537702102198255616/bentheart2.png')
    msg.channel.send(webAttachment)
  }else if (msg.content.toLowerCase() === prefix + 'jacob' || msg.content.toLowerCase() === prefix + 'jaccob') {
    webAttachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/512994325743927325/537656467436601354/image0.jpg')
    msg.channel.send(webAttachment)
  } else if (msg.content.toLowerCase().includes('cunt')){
    webAttachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/373285622225436682/535272121849479188/image0.jpg')
    msg.channel.send(webAttachment)
  } else if (msg.content.toLowerCase().includes('nonce')){
    msg.delete(500)
  }
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//client.login('');
client.login(process.env.BOT_TOKEN);

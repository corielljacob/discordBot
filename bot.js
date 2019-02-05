const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = 'w!';
const food_size = 53

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
  if(msg.author.bot) return;
  if (msg.content.toLowerCase() === prefix + 'ping') {
    msg.channel.send('pong')
  } else if (msg.content.toLowerCase() === prefix + 'help') {
    msg.channel.send('Current Prefix: ' + prefix)
    msg.channel.send('Current usable commands: ping, roast, roast2, leek, thomas, thomas2, raven, tobi, anie, jacob, bentley, nick, cursedfood')
  }else if (msg.content.toLowerCase() === 'jacob is a dodo') {
    msg.channel.send('no u')
  } else if (msg.content.toLowerCase() === 'raven is a dodo') {
    msg.channel.send('yes she is')
  } else if (msg.content.toLowerCase() === 'bye') {
    msg.channel.send('cya')
  } else if (msg.content.toLowerCase() === 'cya') {
    msg.channel.send('bye')
  }else if (msg.content.toLowerCase().includes('rav+')) {
    client.channels.get('447604006584451092').fetchMessages({around: "538600752432807936", limit: 1})
      .then(messages => {
        const fetchedMsg = messages.first();
        var counter = parseInt(fetchedMsg);
        var amt = parseInt(msg.content.substring(4));
        fetchedMsg.edit(counter+amt);
  });
  } else if (msg.content.toLowerCase().includes(prefix + 'roast') && !(msg.content.toLowerCase().includes(prefix + 'roast2')) && !(msg.content.toLowerCase().includes(prefix + 'roast 2'))) {
    if (!msg.mentions.users.size) {
      return msg.channel.send('You need to specify a correct user.')
    }
    const user = msg.mentions.users.first()
    msg.channel.send(`${user} ` + roasts[getRandomInt(roasts.length)])
  } else if (msg.content.toLowerCase().includes(prefix + 'roast2') || msg.content.toLowerCase().includes(prefix + 'roast 2')) {
    if (!msg.mentions.users.size) {
      return msg.channel.send('You need to specify a correct user.')
    }
    const dblkill = msg.mentions.users.map(user => {
      return `${user} ` + roasts[getRandomInt(roasts.length)];
    });
    msg.channel.send(dblkill)
  } else if (msg.content.toLowerCase() === prefix + 'leek') {
    msg.channel.send('Leeks are different than green onions.')
  } else if (msg.content.toLowerCase() === prefix + 'hentai' || msg.content.toLowerCase() === prefix + 'furry') {
    msg.channel.send('Fuck that dumb shit.')
  } else if (msg.content.toLowerCase() === prefix + 'thomas') {
    webAttachment = new Discord.Attachment('http://i66.tinypic.com/fn5wnn.png')
    msg.channel.send(webAttachment)
  }else if (msg.content.toLowerCase() === prefix + 'thomas2') {
    webAttachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/512998012654714890/538190141370662932/nipple-clamps-620x330.png')
    msg.channel.send(webAttachment)
  } else if (msg.content.toLowerCase() === prefix + 'raven') {
    webAttachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/445658785340456965/536339338296950796/Screenshot_2019-01-14-13-08-06.png')
    msg.channel.send(webAttachment)
  } else if (msg.content.toLowerCase() === prefix + 'tobi') {
    webAttachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/346028466434473986/539240408102993920/image0.jpg')
    msg.channel.send(webAttachment)
  } else if (msg.content.toLowerCase() === prefix + 'anie') {
    webAttachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/512994325743927325/538457484277317632/image0.jpg')
    msg.channel.send(webAttachment)
  } else if (msg.content.toLowerCase() === prefix + 'bentley') {
    webAttachment = new Discord.Attachment('https://media.discordapp.net/attachments/537142011455733770/537702102198255616/bentheart2.png')
    msg.channel.send(webAttachment)
  }else if (msg.content.toLowerCase() === prefix + 'jacob' || msg.content.toLowerCase() === prefix + 'jaccob') {
    //webAttachment = new Discord.Attachment('')
    //msg.channel.send(webAttachment)
  } else if (msg.content.toLowerCase() === prefix + 'nick') {
    webAttachment = new Discord.Attachment('https://i.kym-cdn.com/entries/icons/facebook/000/020/442/tumblr_ntzb70PQEm1uwemcqo1_400.jpg')
    msg.channel.send(webAttachment)
  }else if (msg.content.toLowerCase() === prefix + 'morgan') {
    webAttachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/328228325862539274/539490520322539560/image0.png')
    msg.channel.send(webAttachment)
  }else if (msg.content.toLowerCase() === prefix + 'james') {
    webAttachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/542182044898426890/542182398247567360/straight.gif')
    msg.channel.send(webAttachment)
  }else if (msg.content.toLowerCase().includes('feet')){
    webAttachment = new Discord.Attachment('https://i.imgur.com/VWvSEqJ.jpg')
    msg.channel.send(webAttachment)
  }else if (msg.content.toLowerCase().includes('cunt')){
    webAttachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/373285622225436682/535272121849479188/image0.jpg')
    msg.channel.send(webAttachment)
  } else if (msg.content.toLowerCase() === prefix + 'cursedfood'){
    const num = getRandomInt(food_size);
    const attachment = new Discord.Attachment('./images/img'+num+'.png', 'img'+num+'.png');
    msg.channel.send(attachment)
  }
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//client.login('');
client.login(process.env.BOT_TOKEN);

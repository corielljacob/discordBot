const Discord = require('discord.js');
const mongo = require('mongodb').MongoClient
const dburl = process.env.dbconnection
const client = new Discord.Client();
const prefix = 'w!';
const food_size = 62;
const val_size = 31;
const flowers_size = 10;
var name = '';
var db;
var collection;
var command;


mongo.connect(dburl, { useNewUrlParser: true },(err, client) => {
if (err) {
  console.error(err)
  return
}
db = client.db('discordbot')
collection = db.collection('piclinks')
})
//roast array
var roasts = ["commit neck rope please", "you should've been thrown in the harbor with the tea", "cunt", "bitch", "prick", "die", "frick u", "u suck",
  "subscribe to pewdiepie", "you probably say 'big mood' unironically", "I hope your family gets carried away by ants.",
  "ur mom gay", "ur dad lesbian", "ur granny tranny", "ur family tree lgbt", "do u even think before speaking", "ur mom should have swallowed",
  "dont fuck with me; I have the power of GOD and ANIME on my side", "dont ever @ me again", "your mother smells of elderberries",
  "your mother was a hamster and your father smelt of elderberries", "skidaddle skidoodle your dick is now a noodle", "please delete yourself",
  "you are a piece of chet please log off ethernet", "you probably say 'big tea' unironically", "go commit toaster bath", "no u", "go commit toaster bath",
  "Hypothetically though I don’t want you dead", "bentley doesnt love u", "leonardo da binchi", "thomas is gunna ban your ass", "born villain",
  "you probably like being pissed on like lode", "you probably think foot jobs are grosser than eating ass", "eat my ass", "suck my nuts", "suck my ass", "go fuck urself"];



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("w!help --> commands")
});

//command list
client.on('message', msg => {
  if(msg.author.bot) return;

  if(msg.content.toLowerCase().startsWith('w!')){
   command = msg.content.toLowerCase().substring(2);
  }else if(msg.guild === null){
    if (msg.attachments.size === 1) {
      var purl = msg.attachments.first().url
      var myquery = { username: msg.author.username };
      var newvalues = { $set: { url: purl } };
      collection.updateOne(myquery, newvalues, function(err, res) {
        console.log("updated url for " + msg.author.username)
        msg.channel.send('Pic updated!')
      })
    }else{
      msg.channel.send('please send one image and nothing else')
    } return; }
    else if (msg.member.roles.has('598342371037544470')){
      msg.delete(50)
    }else{
      return;
    }

  if (command === 'ping') {
    msg.channel.send('pong')
  } else if (command === 'help') {
    msg.channel.send('Current Prefix: ' + prefix)
    msg.channel.send('Current usable commands: ping, roast, leek, thomas, thomas2, raven, tobi, anie, jacob, james, bentley, nick, erin, \ncursedfood, cursedfood#, stfu , speak , role, setcolor#, dm')
    msg.channel.send('DM the bot a picture to change your name command pic')
  }else if (msg.content.toLowerCase() === 'bye') {
    msg.channel.send('cya')
  } else if (msg.content.toLowerCase() === 'cya') {
    msg.channel.send('bye')
  } else if (command.includes('roast')) {
    if (!msg.mentions.users.size) {
      return msg.channel.send('You need to specify a correct user.')
    }
    const user = msg.mentions.users.first()
    msg.channel.send(`${user} ` + roasts[getRandomInt(roasts.length)])
  } else if (command === 'leek') {
    msg.channel.send('Leeks are different than green onions.')
  } else if (command ==='hentai' || command === 'furry') {
    msg.channel.send('Fuck that dumb shit.')
  } else if (command === 'thomas') {
    namepic(command, msg)
  }else if (command === 'thomas2') {
    namepic(command, msg)
  } else if (command ==='thomas3') {
    namepic(command, msg)
  } else if (command === 'raven') {
    namepic(command, msg)
  } else if (command === 'tobi') {
    namepic(command, msg)
  } else if (command === 'anie') {
    namepic(command, msg)
  } else if (command === 'bentley') {
    namepic(command, msg)
  }else if (command === 'jacob' || command === 'jaccob') {
    namepic(command, msg)
  } else if (command ==='nick') {
    namepic(command, msg)
  }else if (command === 'morgan') {
    namepic(command, msg)
  }else if (command === 'james') {
    namepic(command, msg)
  }else if (command === 'lode') {
    namepic(command, msg)
  }else if (command === 'erin') {
    namepic(command, msg)
  }else if (command === 'cursedfood'){
    const num = getRandomInt(food_size);
    const attachment = new Discord.Attachment('./images/img'+num+'.png', 'img'+num+'.png');
    msg.channel.send(attachment)
  }else if(command.includes('cursedfood#')) {
    const num = parseInt(command.substring(11))
    if (num < 0 || num > 61){
      msg.channel.send("Retry the command with a number between 0 and 61")
    }else{
    const attachment = new Discord.Attachment('./images/img'+num+'.png', 'img'+num+'.png');
    msg.channel.send(attachment)
    }
  }else if (msg.content.toLowerCase().includes('uwu')){
    msg.delete(200)
  }else if (command.includes('stfu')){
    const user = msg.mentions.members.first()
    user.addRole('598342371037544470')
    msg.channel.send(`${user} shut the fuck up`)
  } else if (command.includes('speak')){
    const user = msg.mentions.members.first()
    if(user.roles.has('598342371037544470')){
    user.removeRole('598342371037544470')
    msg.channel.send(`${user} u can speak now`)
    } else {
    msg.channel.send('they can already speak dumbass')
    }
  }else if(command === 'role'){
    const user = msg.member
    msg.channel.send(user.colorRole.hexColor)
  }else if(command.includes('setcolor#')){
    if(msg.content.length != 17){
      msg.channel.send('Enter a valid hex color')
    }else{
    const user = msg.member
    const role = user.colorRole
    const hexColor = msg.content.substring(11,17)
    role.setColor('#'+hexColor)
    msg.channel.send('Set color of role to #'+hexColor )
    }
  }else if(command ===  'dm'){
    msg.author.send('Send a pic to change your command pic')
  }
});

function namepic(command, msg){
  var name = command;
  collection.find().toArray((err, items) => {
    items.forEach(function(element) {
      if(element.name === name){
        var url = element.url
        webAttachment = new Discord.Attachment(url)
        msg.channel.send(webAttachment)
      }
    })
  })
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//client.login('');
client.login(process.env.BOT_TOKEN);


/*Old commands
/*else if (msg.content.toLowerCase().includes(prefix + 'valentine')){
    const num = getRandomInt(val_size);
    if (!msg.mentions.users.size) {
      return msg.channel.send('You need to specify a correct user.')
    }
    const user = msg.mentions.users.first()
    let userVar = msg.author
    const attachment = new Discord.Attachment('./valentines/img'+num+'.jpg', 'img'+num+'.jpg');
    msg.channel.send(`To: ${user} From: ` + userVar)
    msg.channel.send(attachment)
  }else if (msg.content.toLowerCase() === prefix + 'db') {
    collection.find().toArray((err, items) => {
    console.log(items[0].name)
    var url = items[0].url
    webAttachment = new Discord.Attachment(url)
    msg.channel.send(webAttachment)
    })

  else if (msg.content.toLowerCase().includes(prefix + 'flowers')){
    const num = getRandomInt(flowers_size);
    if (!msg.mentions.users.size) {
      return msg.channel.send('You need to specify a correct user.')
    }
    const user = msg.mentions.users.first()
    let userVar = msg.author
    const attachment = new Discord.Attachment('./flowers/img'+num+'.jpg', 'img'+num+'.jpg');
    msg.channel.send(`To: ${user} From: ` + userVar)
    msg.channel.send(attachment)
  }else if (msg.content.toLowerCase().includes('rav+')) {
    client.channels.get('447604006584451092').fetchMessages({around: "538600752432807936", limit: 1})
      .then(messages => {
        const fetchedMsg = messages.first();
        var counter = parseInt(fetchedMsg);
        var amt = parseInt(msg.content.substring(4));
        fetchedMsg.edit(counter+amt);
  });
   }else if (msg.content.toLowerCase().charAt(0) === '*' && msg.content.toLowerCase().charAt(1) === '*'){
    return
  }else if (msg.content.toLowerCase() === '*roleplaying is for losers*'){
    msg.delete(200)
  }else if (msg.content.toLowerCase().charAt(0) === '*' && msg.content.toLowerCase().charAt(msg.length-1) === '*'){
    msg.channel.send('roleplaying is for LOSERS')
  }else if (msg.content.toLowerCase() === (prefix + 'l')) {
    if (!msg.mentions.users.size) {
      return msg.channel.send('You need to specify a correct user.')
    }
    const user = msg.mentions.users.first()
    webAttachment = new Discord.Attachment('https://discordemoji.com/assets/emoji/6976_DrPhiL.png')
    msg.channel.send(`${user}`)
    msg.channel.send(webAttachment)
  }*/

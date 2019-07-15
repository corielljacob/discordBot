const Discord = require('discord.js');
const mongo = require('mongodb').MongoClient
const fetch = require('node-fetch');
const dburl = process.env.dbconnection
const client = new Discord.Client();
const prefix = 'w!';
const food_size = 63;
var db, collection, collection2, command;

mongo.connect(dburl, {
  useNewUrlParser: true
}, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  db = client.db('discordbot')
  collection = db.collection('piclinks')
  collection2 = db.collection('roasts')
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("w!help --> commands")
});

//command list
client.on('message', async msg => {
  if (msg.author.bot) return;

  if (msg.content.toLowerCase().startsWith('w!')) {
    command = msg.content.toLowerCase().substring(2);
  } else if (msg.guild === null) {
    if (msg.attachments.size === 1) {
      var purl = msg.attachments.first().url
      var myquery = {
        username: msg.author.username
      };
      var newvalues = {
        $set: {
          url: purl
        }
      };
      collection.updateOne(myquery, newvalues, function(err, res) {
        console.log("updated url for " + msg.author.username)
        msg.channel.send('Pic updated!')
      })
    } else {
      msg.channel.send('please send one image and nothing else')
    }
    return;
  } else if (msg.member.roles.has('598342371037544470')) {
    msg.delete(50)
  } else {
    return;
  }

  if (command === 'ping') {
    msg.channel.send('pong')
  } else if (command === 'help') {
    msg.channel.send('Current Prefix: ' + prefix)
    msg.channel.send('Current usable commands: ping, roast, leek, thomas, thomas2, raven, tobi, anie, jacob, james, bentley, nick, erin, \ncursedfood, cursedfood#, stfu , speak , role, setcolor#, dm')
    msg.channel.send('DM the bot a picture to change your name command pic')
  } else if (msg.content.toLowerCase() === 'bye') {
    msg.channel.send('cya')
  } else if (msg.content.toLowerCase() === 'cya') {
    msg.channel.send('bye')
  } else if (command.includes('roast')) {
    if (!msg.mentions.users.size) {
      return msg.channel.send('You need to specify a correct user.')
    }
    const user = msg.mentions.users.first()
    collection2.findOne({
      num: '1'
    }, (err, item) => {
      var index = getRandomInt(item.roast.length)
      msg.channel.send(`${user} ` + item.roast[index])
    })
  } else if (command === 'leek') {
    msg.channel.send('Leeks are different than green onions.')
  } else if (command === 'hentai' || command === 'furry') {
    msg.channel.send('Fuck that dumb shit.')
  } else if (command === 'thomas') {
    namepic(command, msg)
  } else if (command === 'raven') {
    namepic(command, msg)
  } else if (command === 'tobi') {
    namepic(command, msg)
  } else if (command === 'anie') {
    namepic(command, msg)
  } else if (command === 'bentley') {
    namepic(command, msg)
  } else if (command === 'jacob' || command === 'jaccob') {
    namepic('jacob', msg)
  } else if (command === 'nick') {
    namepic(command, msg)
  } else if (command === 'morgan') {
    namepic(command, msg)
  } else if (command === 'james') {
    namepic(command, msg)
  } else if (command === 'lode') {
    namepic(command, msg)
  } else if (command === 'erin') {
    namepic(command, msg)
  } else if (command === 'cursedfood') {
    const num = getRandomInt(food_size);
    const attachment = new Discord.Attachment('./assets/images/img' + num + '.png', 'img' + num + '.png');
    msg.channel.send(attachment)
  } else if (command.includes('cursedfood#')) {
    const num = parseInt(command.substring(11))
    if (num < 0 || num > food_size - 1) {
      msg.channel.send("Retry the command with a number between 0 and " + food_size - 1)
    } else {
      const attachment = new Discord.Attachment('./assets/images/img' + num + '.png', 'img' + num + '.png');
      msg.channel.send(attachment)
    }
  } else if (msg.content.toLowerCase().includes('uwu')) {
    msg.delete(200)
  } else if (command.includes('stfu')) {
    const user = msg.mentions.members.first()
    user.addRole('598342371037544470')
    msg.channel.send(`${user} shut the fuck up`)
  } else if (command.includes('speak')) {
    const user = msg.mentions.members.first()
    if (user.roles.has('598342371037544470')) {
      user.removeRole('598342371037544470')
      msg.channel.send(`${user} u can speak now`)
    } else {
      msg.channel.send('they can already speak dumbass')
    }
  } else if (command === 'role') {
    const user = msg.member
    msg.channel.send(user.colorRole.hexColor)
  } else if (command.includes('setcolor#')) {
    if (msg.content.length != 17) {
      msg.channel.send('Enter a valid hex color')
    } else {
      const user = msg.member
      const role = user.colorRole
      const hexColor = msg.content.substring(11, 17)
      role.setColor('#' + hexColor)
      msg.channel.send('Set color of role to #' + hexColor)
    }
  } else if (command === 'dm') {
    msg.author.send('Send a pic to change your command pic')
  } else if (command.includes('ud')) {
    const word = command.substring(3)
    const body = await fetch('http://api.urbandictionary.com/v0/define?term=' + word).then(response => response.json());
    if (body.list.length === 0) {
      msg.channel.send('No definitions found!')
    } else {
      var index = getRandomInt(body.list.length)
      var def = repair(body.list[index].definition, msg)
      msg.channel.send('' + word + ': ' + def)
    }
  }
});

function namepic(command, msg) {
  var name = command;
  collection.find().toArray((err, items) => {
    items.forEach(function(element) {
      if (element.name === name) {
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

function repair(def, msg) {
  for (var i = 0; i < def.length; i++) {
    if (def.charAt(i) === '[' || def.charAt(i) === ']') {
      def = def.substring(0, i) + def.substring(i + 1)
    }
  }
  return def
}

//client.login('');
client.login(process.env.BOT_TOKEN);

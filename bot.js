const Discord = require('discord.js');
const mongo = require('mongodb').MongoClient
const fetch = require('node-fetch');
const fs = require('fs');
const config = require('./config.json')
const dburl = process.env.dbconnection

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

var db, collection, command;


mongo.connect(dburl, {
  useNewUrlParser: true
}, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  db = client.db('discordbot')
  collection = db.collection('piclinks')
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("w!help --> commands")
});

//command list
client.on('message', async msg => {
  if (msg.author.bot) return;

  if (msg.guild === null) {
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
    return
  } else if (!msg.content.startsWith(config.prefix)) return;

  const args = msg.content.slice(config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (config.users.includes(command)) {
    client.commands.get('namepic').execute(msg, args, command)
  } else {
    try {
      client.commands.get(command).execute(msg, args);
    } catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
    }
  }

});

//client.login('');
client.login(process.env.BOT_TOKEN);

const Discord = require('discord.js');
const mongo = require('mongodb').MongoClient
const fetch = require('node-fetch');
const fs = require('fs');
const config = require('./config.json')
const util = require('./utility.js')
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
  /**
  * Do some checking for Mudae bot scenarios
  * Scenario 1: Mudae bot sends message in specific channel with an attachment
  * Scenario 2: Mudae bot sends message in specific channel containing a roll wished by a user
  */
  if (msg.author.id === '548984223592218634' && msg.channel.id == '525528960503775256') {
    if (msg.embeds.length > 0) {
      client.commands.get("mudae").execute(msg);
    }else {
      const emb = msg.embeds[0]
      const exemb = new Discord.RichEmbed(emb)
      const content = exemb.description
      if (content.includes("Wished")){
        msg.channel.send("WISHED FOR CHARACTER")
      }
    }
    return
  }

  if(msg.author.id === '548984223592218634' && msg.content.includes("Wished")){
    const user = msg.mentions.users.first()
    msg.channel.send(`Wished for by ${user} `)
    user.send('A character you wished for just spawned!')
  }

  if (msg.author.bot) return;

  if (msg.guild === null) {
    if (msg.attachments.size === 1) {
      util.setPic(msg, collection)
    } else {
      msg.channel.send('please send one image and nothing else')
    }
    return;

  } else if (!msg.content.startsWith(config.prefix)) return;

  const args = msg.content.slice(config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (config.users.includes(command)) {
    client.commands.get('namepic').execute(msg, args, command)
  } else {
    try {
      client.commands.get(command).execute(msg, args);
    } catch (error) {
      console.log(error)
      msg.reply('there was an error trying to execute that command! That command may not exist, you may have entered the command incorrectly, or the bot is having issues. \nIf you are trying to set your color, the format is: w!setcolor# hexcode');
    }
  }

});

//client.login('');
client.login(process.env.BOT_TOKEN);

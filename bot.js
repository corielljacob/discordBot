const Discord = require('discord.js');
const mongo = require('mongodb').MongoClient
const fetch = require('node-fetch');
const fs = require('fs');
const config = require('./config.json')
const util = require('./utility.js')
const dburl = process.env.dbconnection

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
var db, collection, command

for (const file of commandFiles) {
  command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

mongo.connect(dburl, {
  useNewUrlParser: true
}, (err, dbClient) => {
  if (err) {
    console.error(err)
    return
  }
  db = dbClient.db('discordbot')
  collection = db.collection('piclinks')
})


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("w!help -> commands")
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName === 'first') await interaction.reply('This is my first slash command! More to come soon...');
  console.log("work")
});

//command handling
client.on('message', async msg => {

  var flag = util.initChecks(msg, client, collection);
  if (flag) return;

  //Remove the prefix from the command and split the commands into seperate arguments
  const args = msg.content.slice(config.prefix.length).split(/ +/);
  command = args.shift().toLowerCase();

  //initiate dynamic command handling
  if (config.users.includes(command)) {
    client.commands.get('namepic').execute(msg, args, command)
  } else {
    try {
      client.commands.get(command).execute(msg, args);
    } catch (error) {
      console.log(error)
      msg.reply('there was an error trying to execute that command! That command may not exist, you may have entered the command incorrectly, or the bot is having issues. \nIf you are trying to set your color, the format is: w!setcolor AABBCC');
    }
  }
});

//client.login(''); Used for local hosting
client.login(process.env.BOT_TOKEN);

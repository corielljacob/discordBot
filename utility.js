const Discord = require('discord.js')
const mongo = require('mongodb').MongoClient
const url = process.env.dbconnection;
const config = require('./config.json')

var _db;

module.exports = {
  //Calculate a random number between 0 and max (exclusive)
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  },
  setPic(msg, collection) {
    var purl = msg.attachments.first().url
    var myquery = {
      id: msg.author.id
    };
    var newvalues = {
      $set: {
        url: purl
      }
    };
    collection.updateOne(myquery, newvalues, function(err, res) {
      console.log("updated url for " + msg.author.id)
      msg.channel.send('Pic updated!')
    })
  },
  linkRepair(link) {
    if (link.includes('jpg') || link.includes('jpeg') || link.includes('gif') || link.includes('png')) {
      if (link.includes('jpeg')) {
        if (!(link.includes('jpeg/')))
          link = link.substring(0, link.indexOf('jpeg') + 4)
      } else if (link.includes('jpg')) {
        if (!(link.includes('jpg/')))
          link = link.substring(0, link.indexOf('jpg') + 3)
      } else if (link.includes('gif')) {
        if (!(link.includes('gif/')))
          link = link.substring(0, link.indexOf('gif') + 3)
      } else if (link.includes('png')) {
        if (!(link.includes('png/')))
          link = link.substring(0, link.indexOf('png') + 3)
      }
    }
    return link
  },
  initChecks(msg, client, collection){
    //if message sent as DM to bot contains a picture, initiate setPic command
    if (msg.guild === null) {
      if (msg.attachments.size === 1) {
        this.setPic(msg, collection)
      } else {
        if(!msg.author.bot){
          msg.client.channels.get('671527521816150017').send(msg.content);
          msg.client.channels.get('537142011455733770').send(msg.author.username + ' ' + msg.content);
        }
      }
      return true

    }
    /**
     * Do some checking for Mudae bot scenarios
     * Scenario 1: Mudae bot sends message in specific channel with an attachment
     * Scenario 2: Mudae bot sends message in specific channel containing a roll wished by a user
     */
    if (msg.author.id === '548984223592218634' && msg.channel.id == '525528960503775256') {
      if (msg.embeds.length > 0) {
        client.commands.get("mudae").execute(msg);
      } else {
        const emb = msg.embeds[0]
        const exemb = new Discord.RichEmbed(emb)
        const content = exemb.description
        if (content.includes("Wished")) {
          msg.channel.send("WISHED FOR CHARACTER")
        }
      }
      return true
    }

    if(msg.guild.id == '661803881549791245' && (msg.content.includes("sabre") || msg.content.includes("Sabre"))){
      msg.delete()
      if(msg.author.id == '206693327268085760'){
        msg.channel.send('ERIN YOU ABSOLUTE BUFFOON')
      }else{
        msg.channel.send(`${msg.author} are you dumb????`)
      }
    }

    //Customization for Mudae bot
    if (msg.author.id === '548984223592218634' && msg.content.includes("Wished")) {
      const user = msg.mentions.users.first()
      msg.channel.send(`Wished for by $ {user} `)
      user.send('A character you wished for just spawned!')
      return true
    }

    if(msg.author.id === '371301929004957696' && msg.mentions.users.size > 0){
      msg.channel.send('ok poo poo boy')
    }

    //Hourly execution of hansen command via IFTTT web request
    if(msg.content == 'w!summon'){
      client.commands.get('hansen').execute(msg)
      return true
    }

    if(msg.content == 'w!randomcolor'){
      client.commands.get('randomcolor').execute(msg, false)
      return true
    }

    if(msg.content == 'w!am'){
      client.commands.get('acnh').execute(msg, 0)
      return true
    }

    if(msg.content == 'w!pm'){
      client.commands.get('acnh').execute(msg, 1)
      return true
    }

    //If message sent is from a bot, exit
    if (msg.author.bot || !msg.content.startsWith(config.prefix)){
      return true
    }

  },

  calcResult(msg, userChoice, botChoice, randomPick) {
    msg.channel.send("I throw " + botChoice)
    if (userChoice - randomPick == 0) {
      const pepehands = msg.client.emojis.resolve('513416952082071572')
      msg.channel.send("I lose " + pepehands.toString())
    } else {
      const pepelaugh = msg.client.emojis.resolve('694965024455786517')
      msg.channel.send("I win " + pepelaugh.toString())
    }
  }

}

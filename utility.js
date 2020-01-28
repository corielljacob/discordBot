const Discord = require('discord.js')
const mongo = require('mongodb').MongoClient
const config = require('./config.json')

module.exports = {
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  },
  setPic(msg, collection) {
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
  initChecks(msg, client){

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
      return
    }

    if (msg.author.id === '548984223592218634' && msg.content.includes("Wished")) {
      const user = msg.mentions.users.first()
      msg.channel.send(`Wished for by ${user} `)
      user.send('A character you wished for just spawned!')
    }

    if(msg.content == 'w!summon'){
      client.commands.get('hansen').execute(msg);
    }

    //If message sent is from a bot, exit
    if (msg.author.bot) return;

    //if message sent as DM to bot contains a picture, initiate setPic command
    if (msg.guild === null) {
      if (msg.attachments.size === 1) {
        util.setPic(msg, collection)
      } else {
        msg.client.channels.get('671527521816150017').send(msg.content);
        msg.client.channels.get('537142011455733770').send(msg.author.username + ' ' + msg.content);
      }
      return;

    } else if (!msg.content.startsWith(config.prefix)) return; //if a message doesnt contain the prefix, exit

  }

}

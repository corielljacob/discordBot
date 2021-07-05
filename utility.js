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
    client.commands.get('randomcolor').execute(msg, false)

    //if message sent as DM to bot contains a picture, initiate setPic command
    if (msg.guild === null) {
      if (msg.attachments.size === 1) {
        this.setPic(msg, collection)
      } else {
        if(!msg.author.bot){
          msg.client.channels.cache.get('512994325743927325').send(msg.content);
        }
      }
      return true
    }

    //Hourly execution of hansen command via IFTTT web request
    if(msg.content == 'w!summon'){
      client.commands.get('hansen').execute(msg)
      return true
    }

    if(msg.content == 'w!randomcolor'){
      client.commands.get('randomcolor').execute(msg, true)
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

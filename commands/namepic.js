var db, collection;
const mongo = require('mongodb').MongoClient
const config = require('../config.json');
const Discord = require('discord.js');
const dburl = process.env.dbconnection

module.exports = {
  name: 'namepic',
  description: 'Displays picture for specified user',
  execute(msg, args, command) {
    mongo.connect(dburl, {
      useNewUrlParser: true
    }, (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      db = client.db('discordbot')
      collection = db.collection('piclinks')
      collection.find().toArray((findErr, items) => {
        items.forEach(function(element) {
          if (element.name === command) {
            const url = element.url
            const webAttachment = new Discord.MessageAttachment(url)
            msg.channel.send(webAttachment)
          }
        })
      })
    })
  },
};

var db, collection;
const mongo = require('mongodb').MongoClient
const config = require('../config.json');
const Discord = require('discord.js');

module.exports = {
  name: 'namepic',
  description: 'Displays picture for specified user',
  execute(msg, args, command) {
    mongo.connect(config.dburl, {
      useNewUrlParser: true
    }, (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      db = client.db('discordbot')
      collection = db.collection('piclinks')
      collection.find().toArray((err, items) => {
        items.forEach(function(element) {
          if (element.name === command) {
            var url = element.url
            webAttachment = new Discord.Attachment(url)
            msg.channel.send(webAttachment)
          }
        })
      })
    })
  },
};

const Discord = require('discord.js');
const mongo = require('mongodb').MongoClient

module.exports = {
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  },

  dbconnect(dburl){
    mongo.connect(dburl, {
      useNewUrlParser: true
    }, (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      db = client.db('discordbot')
      //collection = db.collection('piclinks')
    })

    return db;
  }
}

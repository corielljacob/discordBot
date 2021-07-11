const config = require('../config.json');
const mongo = require('mongodb').MongoClient;
const util = require('../utility.js');
const dburl = process.env.dbconnection
var db, collection;

module.exports = {
  name: 'weather',
  description: 'Provides weather for a given user',
  execute(msg, args) {
    if (!msg.mentions.users.size) {
      return msg.channel.send('You need to specify a correct user.')
    }
    const user = msg.mentions.users.first()
    var loc = this.getLocationForUser(msg, user)
    msg.channel.send(loc)
  },
  getLocationForUser(msg, user) {
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
          if (element.id == user.id) {
            console.log('matched a user')
            if (element.location != 'null') {
              console.log(element.location)
              console.log('found a location')
              return element.location;
            }
          }
        })
        return 'null';
      })
    })
  },
};

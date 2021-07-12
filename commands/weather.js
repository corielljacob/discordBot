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
              loc = element.location;
            }
          }
        })
        loc = 'null';
        buildEmbed();
      })
    })

    var loc = '' + this.getLocationForUser(msg, user)
    msg.channel.send('User location: ' + loc)
  },
  buildEmbed(msg, user, loc) {
    console.log(`User ${user.id} has loc ${loc}`)
    msg.channel.send(loc)
  },
};

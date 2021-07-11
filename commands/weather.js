const config = require('../config.json');
const mongo = require('mongodb').MongoClient;
const util = require('../utility.js');
module.exports = {
  name: 'weather',
  description: 'Provides weather for a given user',
  execute(msg, args) {
    if (!msg.mentions.users.size) {
      return msg.channel.send('You need to specify a correct user.')
    }
    const user = msg.mentions.users.first()
    const loc = this.getLocationForUser(msg, user)
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
          if (element.id === user.id) {
            if (element.location != 'null') {
              return element.location;
            }
            return 'null';
          }
        })
      })
    })
  },
};

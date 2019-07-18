const config = require('../config.json');
const mongo = require('mongodb').MongoClient;
module.exports = {
  name: 'roast',
  description: 'Roasts a mentioned user',
  execute(msg, args) {
    if (!msg.mentions.users.size) {
      return msg.channel.send('You need to specify a correct user.')
    }
    const user = msg.mentions.users.first()
    this.roast(msg, user)
  },
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  },
  roast(msg, user) {
    var collection2, dburl;
    dburl = process.env.dburl;
    mongo.connect(dburl, {
      useNewUrlParser: true
    }, (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      db = client.db('discordbot')
      collection2 = db.collection('roasts')
      collection2.findOne({
        num: '1'
      }, (err, item) => {
        var index = this.getRandomInt(item.roast.length)
        msg.channel.send(`${user} ` + item.roast[index])
      })
    })
  },
};

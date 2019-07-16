const mongo = require('mongodb').MongoClient

var db, collection, collection2;
const dburl = 'mongodb://coriell.jacob:reddog01@ds247670.mlab.com:47670/discordbot' //process.env.dbconnection

mongo.connect(dburl, {
  useNewUrlParser: true
}, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  db = client.db('discordbot')
  collection = db.collection('piclinks')
  collection2 = db.collection('roasts')
})

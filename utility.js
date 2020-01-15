const Discord = require('discord.js');
const mongo = require('mongodb').MongoClient

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
  }

}

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
  },

  hansen(hours, msg){
    setTimeout(function(){
      var webAttachment = new Discord.Attachment("https://vignette.wikia.nocookie.net/to-catch-a-predator/images/2/29/6b7f722f-750a-45d8-aca4-d3db587ded7f.jpg")
      msg.client.channels.get('537142011455733770').send(webAttachment);
      msg.client.channels.get('537142011455733770').send("Why dont you take a seat...");

    }, 1000 * (60*hours));
   }
    /*setInterval(function(){
        var webAttachment = new Discord.Attachment("https://vignette.wikia.nocookie.net/to-catch-a-predator/images/2/29/6b7f722f-750a-45d8-aca4-d3db587ded7f.jpg")
        msg.client.channels.get('537142011455733770').send(webAttachment);
        msg.client.channels.get('537142011455733770').send("Why dont you take a seat...");
    }, 1000 * (60*hours))
  }*/

}

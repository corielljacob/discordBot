const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js')
module.exports = {
  name: 'image',
  description: 'Finds a google image result for a search term',
  async execute(msg, args) {
    var searchterm = ''
    while (args.length !== 0) {
      searchterm = searchterm.concat(args.shift().toLowerCase()) + ' '
    }
    var q = 'q=' + searchterm
    var num = 'num=' + 1
    var start = 'start=' + parseInt(util.getRandomInt(100) + 1)
    var imgSize = 'imgSize=medium'
    var searchType = 'searchType=image'
    var key = process.env.google_key
    var cx = process.env.cx

    var body = await fetch('https://www.googleapis.com/customsearch/v1?' + q + '&' + num + '&' + start + '&' + imgSize + '&' + searchType + '&' + key + '&' + cx)
    .then(response => {
      if (!response.ok) {
        console.log('error!')
        throw response
      }
      return response.json()
    })

    if (body.items == null || body.items[0] == null || body.items[0].link == null) {
      msg.channel.send('Couldnt parse that image, please try again.')
      return;
    }
    var link = body.items[0].link
    link = util.linkRepair(link)

    try {
      const attachment = new Discord.MessageAttachment(link);
      msg.channel.send(attachment)
    } catch (error) {
      msg.channel.send('Couldnt display this image. Sorry!')
    }
  }
}

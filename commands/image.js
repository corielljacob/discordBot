const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
module.exports = {
  name: 'image',
  description: 'Finds a google image result for a search term',
  async execute(msg, args) {
    var searchterm = ''
    while (!(args.length === 0)) {
      searchterm = searchterm.concat(args.shift().toLowerCase()) + ' '
    }
    var q = 'q=' + searchterm
    var num = 'num=' + 1
    var start = 'start=' + parseInt(this.getRandomInt(100) + 1)
    var imgSize = 'imgSize=medium'
    var searchType = 'searchType=image'
    var key = process.env.google_key
    var cx = process.env.cx

    var body = await fetch('https://www.googleapis.com/customsearch/v1?' + q + '&' + num + '&' + start + '&' + imgSize + '&' + searchType + '&' + key + '&' + cx).then(response => {
      if (!response.ok) {
        console.log('error!')
        throw response
      }
      return response.json() //we only get here if there is no error
    })


    //.then(response => response.json())


    //console.log(body.items[0].link)
    if (body.items == null || body.items[0] == null || body.items[0].link == null) {
      msg.channel.send('Couldnt parse that image, please try again.')
      return;
    }
    var link = body.items[0].link

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
    try {
      var webAttachment = new Discord.Attachment(link)
      console.log(body.items[0].link + '\n' + link)
      msg.channel.send(webAttachment)
    } catch (error) {
      msg.channel.send('Couldnt display this image. Sorry!')
    }
  },
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  },
  isValid(link, index) {
    char = link.charAt(index + 1)
    if (char === 'p' || char === 'g' || char === 'j')
      return true
    else
      return false
  }
}

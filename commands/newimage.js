const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js')
module.exports = {
  name: 'newimage',
  description: 'Finds a google image result for a search term',
  async execute(msg, args) {
    var searchterm = ''
    while (!(args.length === 0)) {
      searchterm = searchterm.concat(args.shift().toLowerCase()) + ' '
    }
    var autoCorrect =  true
    var pageNumber = 'pageNumber='parseInt(util.getRandomInt(1500))
    var pageSize = 'pageSize=1'
    q = 'q='+searchterm
    safeSearch = false

    var body = await fetch('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?' + q + '&' + autoCorrect + '&' + pageNumber + '&' + pageSize + '&' + safeSearch).then(response => {
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
    var link = body.value[0].link
    //link = util.linkRepair(link)

    try {
      var webAttachment = new Discord.Attachment(link)
      msg.channel.send(webAttachment)
    } catch (error) {
      msg.channel.send('Couldnt display this image. Sorry!')
    }
  }
}

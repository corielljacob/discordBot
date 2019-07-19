const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js')
module.exports = {
  name: 'newimage_DONOTUSE',
  description: 'Finds a google image result for a search term using a different API. Currently very slow and similar output. Not used for now.',
  async execute(msg, args) {
    var searchterm = ''
    while (!(args.length === 0)) {
      searchterm = searchterm.concat(args.shift().toLowerCase()) + ' '
    }
    var autoCorrect =  true
    var pageNumber = 'pageNumber='+parseInt(util.getRandomInt(1500))
    var pageSize = 'pageSize=1'
    q = 'q='+searchterm
    safeSearch = false

    var body = await fetch('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?' + q + '&' + autoCorrect + '&' + pageNumber + '&' + pageSize + '&' + safeSearch, {
      headers:{
        'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '405f0c0b1emshb22fbc9987c0fc4p1a490fjsn96da1de1b34d'
      }
    }).then(response => {
      if (!response.ok) {
        console.log('error!')
        throw response
      }
      return response.json()
    })

    /*if (body.items == null || body.items[0] == null || body.items[0].link == null) {
      msg.channel.send('Couldnt parse that image, please try again.')
      return;
    }*/
    var link = body.value[0].url
    //link = util.linkRepair(link)

    try {
      console.log(link)
      var webAttachment = new Discord.Attachment(link)
      msg.channel.send(webAttachment)
      console.log('done')
    } catch (error) {
      msg.channel.send('Couldnt display this image. Sorry!')
    }
  }
}

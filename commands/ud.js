const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'ud',
  description: 'Finds urban dictionary definition for a word or words',
  async execute(msg, args) {
    var word = ''
    while (args.length !== 0) {
      word = word.concat(args.shift().toLowerCase()) + ' '
    }
    const body = await fetch('http://api.urbandictionary.com/v0/define?term=' + word).then(response => response.json());

    if (body == null || body.list == null || body.list.length == null) {
      msg.channel.send("No definitions found")
      return
    }

    var index = util.getRandomInt(body.list.length)

    if (body.list[index] == null || body.list[index].definition == null) {
      msg.channel.send("No definitions found")
      return
    }



    while (body.list[index].definition.length > 2000) {
      index = util.getRandomInt(body.list.length)
    }

    var def = body.list[index].definition.replace(/\[/g, '')
    def = def.replace(/\]/g, '')
    var ex = body.list[index].example.replace(/\[/g, '')
    ex = ex.replace(/\]/g, '')
    var entry = body.list
    if (ex.length === 0) {
      ex = 'No examples found'
    }

    var output = ('__**Word**__\n' + entry[index].word + '\n' + '__**Definition**__\n' + def + '\n' + '__**Example**__\n' + ex + '\n' + '__**Rating**__\n' + entry[index].thumbs_up + ' thumbs up, ' + entry[index].thumbs_down + ' thumbs down')

    msg.channel.send(output)

  },
}

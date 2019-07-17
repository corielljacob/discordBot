const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
module.exports = {
  name: 'ud',
  description: 'Finds urban dictionary definition for a word or words',
  async execute(msg, args) {
    var word = ''
    while(!(args.length === 0)){
      word = word.concat(args.shift().toLowerCase()) + ' '
    }
    const body = await fetch('http://api.urbandictionary.com/v0/define?term=' + word).then(response => response.json());
    if (body == null) {
      msg.channel.send('No definitions found!')
    } else {
      var index = this.getRandomInt(body.list.length)
      while(body.list[index].definition.length > 1024){
        index = this.getRandomInt(body.list.length)
      }

      var def = body.list[index].definition.replace(/\[/g,'')
      def = def.replace(/\]/g,'')
      var ex = body.list[index].example.replace(/\[/g,'')
      ex = ex.replace(/\]/g,'')
      var entry = body.list
      if(ex.length === 0){
        ex = 'No examples found'
      }
      const embed = new Discord.RichEmbed()
        .setColor('#125456')
        .setTitle(entry[index].word)
        .setURL(entry[index].permalink)
        .addField('Definition', def)
        .addField('Example', ex)
        .addField('Rating', entry[index].thumbs_up + ' thumbs up, ' + entry[index].thumbs_down + ' thumbs down');
      msg.channel.send(embed)
    }
  },
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}

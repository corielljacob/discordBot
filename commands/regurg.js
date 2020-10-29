const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
  name: 'regurg',
  description: 'Regurgitate from some random number of messages',
  execute(msg, args) {

    let msgs = util.getRandomInt(6) + 1;

    let chnl = msg.channel;
    let words = ''
    let numWords;
    chnl.messages.fetch({limit: msgs})
      .then(msgCollection => msgCollection.forEach(function(msgSingle) {
        words += msgSingle.content + ' ';
      }))
      .then(function(param){
        msg.channel.send(`Here are the last ${msgs} messages`)
        msg.channel.send(words)
      })


  }
}

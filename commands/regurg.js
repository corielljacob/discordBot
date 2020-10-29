const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
  name: 'regurg',
  description: 'Regurgitate from some random number of messages',
  execute(msg, args) {

    let msgs = util.getRandomInt(6) + 2;

    let chnl = msg.channel;
    let words = ''
    let numWords;
    let finalMsg;
    chnl.messages.fetch({limit: msgs})
      .then(msgCollection => msgCollection.forEach(function(msgSingle) {
        words += msgSingle.content + ' ';
      }))
      .then(function(param){
        let wordArray = words.split(' ');
        let iterations = util.getRandomInt(wordArray.length)
        let i = 0;
        while(i < iterations){
          let index = util.getRandomInt(wordArray.length)
          finalMsg += wordArray[index]
          i++
        }
      });



  }
}

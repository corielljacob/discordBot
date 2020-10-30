const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
  name: 'regurg',
  description: 'Regurgitate from some random number of messages',
  execute(msg, args) {
    let msgs = util.getRandomInt(6) + 2;
    let chnl = msg.channel;
    let words = ''
    let finalMsg = '';
    chnl.messages.fetch({limit: msgs})
      .then(msgCollection => msgCollection.forEach(function(msgSingle) {
        if(msgSingle.content !== 'w!regurg' && msgSingle.content)
          words += msgSingle.content + ' ';
      }))
      .then(function(param){
        let wordArray = words.split(" ");
        let iterations = util.getRandomInt(wordArray.length)
        let i = 0;
        while(i <= iterations && finalMsg.length > 1){
          let index = util.getRandomInt(wordArray.length)
          let word = wordArray[index]
          if(word !== " "){
            //word = word.replaceAll(" ", "")
            finalMsg += word + ' '
          }
          i++
        }
        msg.channel.send(finalMsg)
      });
  }
}

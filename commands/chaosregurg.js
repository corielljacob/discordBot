const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
  name: 'chaosregurg',
  description: 'Regurgitate from some random number of characters from a random number of messages',
  execute(msg, args) {
    let msgs = util.getRandomInt(30) + 2;
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
        let iterations = 255;//util.getRandomInt(wordArray.length)
        let i = 0;
        while(i <= iterations || finalMsg.length < 1){
          let index = util.getRandomInt(words.length)
          var randomCharacter = words.charAt(index);
          if(randomCharacter !== ' '){
            finalMsg += words.charAt(index);
            i++;
          }
        }
        msg.channel.send(finalMsg)
      });
  }
}

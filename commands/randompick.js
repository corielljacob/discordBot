const util = require('../utility.js')
module.exports = {
  name: 'randompick',
  description: 'Picks a random string from user supplied comma-separated-list',
  execute(msg, args) {
    let list = msg.content.substring(13)
    let arr = list.split(",")
    var i;
    for(i = 0; i < arr.length; i++){
      if (arr[i].startsWith(" ")){
        arr[i] = arr[i].substring(1);
      }
    }
    var index = util.getRandomInt(arr.length)
    msg.channel.send("I choose: " + arr[index])
  }
};

const util = require('../utility.js')
module.exports = {
  name: 'coinflip',
  description: 'Flips a coin and outputs the result',
  execute(msg, args) {
    const result = util.getRandomInt(2)
    if(result === 0){
      msg.channel.send("Coin is heads!")
    }
    else if (result === 1){
      msg.channel.send("Coin is tails!")
    }
    else{
      msg.channel.send("This shouldnt have happened. Ping jacob")
    }
  }
};

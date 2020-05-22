const util = require('../utility.js')
module.exports = {
  name: 'RPS',
  description: 'Play Rock-Paper-Scissors',
  execute(msg, args) {
    let choices = ["rock", "paper", "scissors"]
    let randomPick = util.getRandomInt(3);
    msg.channel.send("I have made my choice, now type yours to play");
    const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, {
      time: 20000
    });

    collector.on('collect', async message => {
      msg.channel.send("I throw " + choices[randomPick])
      message = message.toLowerCase();
      switch(message) {
        case "rock":
          if(randomPick == 1) msg.channel.send("We tie.")
          else if(randomPick == 2) msg.channel.send("I win!")
          else msg.channel.send("I lose...")
        case "paper":
          if(randomPick == 1) msg.channel.send("I lose...")
          else if(randomPick == 2) msg.channel.send("We tie.")
          else msg.channel.send("I win!")
        case "scissors":
          if(randomPick == 1) msg.channel.send("I win!")
          else if(randomPick == 2) msg.channel.send("I lose...")
          else msg.channel.send("We tie.")
        default:
          msg.channel.send("Thats not a valid choice. Try again.")
      }
    });

  }
};

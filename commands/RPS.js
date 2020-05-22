const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
  name: 'rps',
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
      let userChoice = message.content.toLowerCase();
      switch(userChoice) {
        case "rock":
          if(randomPick == 0) msg.channel.send("We tie.")
          else if(randomPick == 1) msg.channel.send("I win!")
          else msg.channel.send("I lose...")
          break
        case "paper":
          if(randomPick == 0) msg.channel.send("I lose...")
          else if(randomPick == 1) msg.channel.send("We tie.")
          else msg.channel.send("I win!")
          break
        case "scissors":
          if(randomPick == 0) msg.channel.send("I win!")
          else if(randomPick == 1) msg.channel.send("I lose...")
          else msg.channel.send("We tie.")
          break
        default:
          msg.channel.send("Thats not a valid choice. Try again.")
      }
    });

  }
};

const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
  name: 'rps',
  description: 'Play Rock-Paper-Scissors',
  execute(msg, args) {
    const pepehands = msg.client.emojis.find(emoji => emoji.name === "pepehands")
    const pepelaugh = msg.client.emojis.find(emoji => emoji.name === "pepelaugh")
    const monkaS = msg.client.emojis.find(emoji => emoji.name === "monkaS")
    let choices = ["rock", "paper", "scissors"]
    let randomPick = util.getRandomInt(3);
    msg.channel.send("I have made my choice, now type yours to play");
    const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, {
      max: 1,
      time: 20000
    });

    collector.on('collect', async message => {
      msg.channel.send("I throw " + choices[randomPick])
      let userChoice = message.content.toLowerCase();
      switch(userChoice) {
        case "rock":
          if(randomPick == 0) msg.channel.send("We tie " + monkaS.toString())
          else if(randomPick == 1) msg.channel.send("I win " + pepelaugh.toString())
          else msg.channel.send("I lose " + pepehands.toString())
          break
        case "paper":
          if(randomPick == 0) msg.channel.send("I lose " + pepehands.toString())
          else if(randomPick == 1) msg.channel.send("We tie " + monkaS.toString())
          else msg.channel.send("I win " + pepelaugh.toString())
          break
        case "scissors":
          if(randomPick == 0) msg.channel.send("I win " + pepelaugh.toString())
          else if(randomPick == 1) msg.channel.send("I lose " + pepehands.toString())
          else msg.channel.send("We tie " + monkaS.toString())
          break
        default:
          msg.channel.send("Thats not a valid choice. Try again.")
      }
    });

  }
};

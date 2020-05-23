const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
  name: 'rps',
  description: 'Play Rock-Paper-Scissors',
  execute(msg, args) {
    const pepehands = msg.client.emojis.find(emoji => emoji.name === "pepehands")
    const pepelaugh = msg.client.emojis.find(emoji => emoji.name === "pepelaugh")
    const monkaS = msg.client.emojis.find(emoji => emoji.name === "monkaS")
    const rock = msg.client.emojis.find(emoji => emoji.name === "punch")
    const paper = msg.client.emojis.find(emoji => emoji.name === "back_of_hand")
    const scissors = msg.client.emojis.find(emoji => emoji.name === "v")
    let choices = ["rock", "paper", "scissors"]
    let randomPick = util.getRandomInt(3);
    msg.channel.send("I have made my choice, now react or type yours to play").then(function(msg){
      msg.react('713586313005236256')
      msg.react('713586338540158996')
      msg.react('713586366109319168')
    })
    const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, {
      max: 1,
      time: 20000
    });

    collector.on('collect', async message => {
      let botChoice = choices[randomPick]
      let userChoice = message.content.toLowerCase()
      if(userChoice === botChoice) {
        msg.channel.send("I throw " + botChoice)
        msg.channel.send("We tie " + monkaS.toString())
        return
      }
      switch(userChoice) {
        case "rock":
          userChoice = 2
          break
        case "paper":
          userChoice = 0
          break
        case "scissors":
          userChoice = 1
          break
        default:
          msg.channel.send("Thats not a valid choice. Try again.")
          return
      }
      msg.channel.send("I throw " + botChoice)
      if (userChoice - randomPick == 0){
        msg.channel.send("I lose " + pepehands.toString())
      } else {
        msg.channel.send("I win " + pepelaugh.toString())
      }
    });

  }
};

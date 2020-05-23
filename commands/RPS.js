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
    let userChoice = 0;
    let botChoice = choices[randomPick]

    msg.channel.send("I have made my choice, now react or type yours to play").then(function(msg) {
      msg.react('👊')
      msg.react('✋')
      msg.react('✌️')

      const filter = (reaction, user) => {
        return user.id === msg.author.id
      }

      const emojiCollector = msg.createReactionCollector(filter, {
        max: 1,
        time: 20000
      })

      emojiCollector.on('collect', (reaction, user) => {
        console.log("collected")
        switch (reaction) {
          case '👊':
            userChoice = 2
            break
          case '✋':
            userChoice = 0
            break
          case '✌️':
            userChoice = 1
            break
        }
        util.calcResult(msg, userChoice, botChoice)
        return
      })
    })

    const msgCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, {
      max: 1,
      time: 20000
    });

    msgCollector.on('collect', async message => {
      userChoice = message.content.toLowerCase()
      if (userChoice === botChoice) {
        msg.channel.send("I throw " + botChoice)
        msg.channel.send("We tie " + monkaS.toString())
        return
      }
      switch (userChoice) {
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
      util.calcResult(msg, userChoice, botChoice)
      return
    });



  }
};

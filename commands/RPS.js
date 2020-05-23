const util = require('../utility.js')
const Discord = require('discord.js');
module.exports = {
  name: 'rps',
  description: 'Play Rock-Paper-Scissors',
  execute(msg, args) {
    let used = false;
    const pepehands = msg.client.emojis.find(emoji => emoji.name === "pepehands")
    const pepelaugh = msg.client.emojis.find(emoji => emoji.name === "pepelaugh")
    const monkaS = msg.client.emojis.find(emoji => emoji.name === "monkaS")
    const rock = msg.client.emojis.find(emoji => emoji.name === "punch")
    const paper = msg.client.emojis.find(emoji => emoji.name === "back_of_hand")
    const scissors = msg.client.emojis.find(emoji => emoji.name === "v")
    let choices = ["rock", "paper", "scissors"]
    let emojiChoices = ['👊','✋','✌️']
    let randomPick = util.getRandomInt(3);
    let userChoice = 0;
    let botChoice = choices[randomPick]

    msg.channel.send("I have made my choice, now react or type yours to play").then(function(message) {
      message.react('👊')
      message.react('✋')
      message.react('✌️')

      const filter = (reaction, user) => {
        return user.id === msg.author.id && !used
      }

      const emojiCollector = message.createReactionCollector(filter, {
        max: 1,
        time: 20000
      })

      emojiCollector.on('collect', (reaction, user) => {
        let emoji = reaction.emoji
        used = true;
        if(reaction == emojiChoices[randomPick]){
          msg.channel.send("We tie " + monkaS.toString())
          return
        }
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
        console.log("user choice: " + userChoice)
        console.log("bot choice " + botChoice)
        console.log(emoji)
        util.calcResult(msg, userChoice, botChoice, randomPick)
        return
      })
    })

    const msgfilter = m => {
      return m.author.id === msg.author.id && !used
    }

    const msgCollector = new Discord.MessageCollector(msg.channel, msgfilter, {
      max: 1,
      time: 20000
    });

    msgCollector.on('collect', async message => {
      used = true;
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
      util.calcResult(msg, userChoice, botChoice, randomPick)
      return
    });



  }
};

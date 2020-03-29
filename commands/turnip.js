const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'turnip',
  description: 'Calculate turnip expenditure and potential profit/loss',
  async execute(msg) {

    var first = false
    var second = false
    var third = false
    var response1 = ""
    var response2 = ""

    const filter1 = m1 => {
      return m1.author.id === msg.author.id
    }

    const filter2 = m2 => {
      return ((first === true) && m2.author.id === msg.author.id)
    }

    const filter3 = m3 => {
      return ((second === true) && m2.author.id === msg.author.id)
    }

    msg.channel.send("How many turnips did you purchase?")
    msg.channel.awaitMessages(filter1, {
        max: 1,
        time: 10000
      })
      .then(collected => {
        response1 = collected.first().content;
        first = true;
        msg.channel.send("At what price did you purchase those turnips?")
      });

      msg.channel.awaitMessages(filter2, {
          max: 1,
          time: 10000
        })
        .then(collected2 => {
          response2 = collected2.first().content;
          msg.channel.send(response1 + " " + response2)
        });

  }

}

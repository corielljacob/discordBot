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
      return ((second === true) && m3.author.id === msg.author.id)
    }

    msg.channel.send("How many turnips did you purchase?")
    msg.channel.awaitMessages(filter1, {
        max: 1,
        time: 60000
      })
      .then(collected => {
        response1 = collected.first().content;
        first = true;
        msg.channel.send("At what price did you purchase those turnips?")
      });

      msg.channel.awaitMessages(filter2, {
          max: 1,
          time: 60000
        })
        .then(collected2 => {
          response2 = collected2.first().content;
          second = true;
          msg.channel.send("At what price would you like to sell those turnips?")
        });

        msg.channel.awaitMessages(filter3, {
            max: 1,
            time: 60000
          })
          .then(collected3 => {
            response3 = collected3.first().content;
            const revenue = parseInt(response1)*parseInt(response2)
            const net = (parseInt(response1)*parseInt(response3)) - revenue
            var sign
            if (net > 0) {
              sign = "gain"
            } else {
              sign = "loss"
            }
            msg.channel.send("So you spent " + revenue + " bells on " + response1 + " turnips, and you would like to sell them for " + response3 + " bells each.\nYour net " + sign + " would be " + net + " bells.")
          });
  }

}

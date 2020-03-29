const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'turnip',
  description: 'Calculate turnip expenditure and potential profit/loss',
  async execute(msg) {
    const filter1 = m1 => {
      return m1.author.id === msg.author.id
    }

    msg.channel.awaitMessages(filter1, {
        max: 1,
        time: 10000
      })
      .then(collected => {
        const response = collected.first();
        msg.channel.send(response.content)
      });
  }

}

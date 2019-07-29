const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'decision',
  description: 'Makes a yes or no decision with attached gif',
  async execute(msg, args) {
    const body = await fetch('http://yesno.wtf/api/').then(response => response.json());

    var webAttachment = new Discord.Attachment(body.image)
    msg.channel.send(webAttachment)
  }
}

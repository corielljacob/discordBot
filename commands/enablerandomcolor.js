const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'togglerandomcolor',
  description: 'Sets role to a random color after every message sent',
  execute(msg, intended) {
    role = msg.client.guilds.cache.get('512994325307850753').roles.cache.get('865662634337239091')
    myMember = msg.member;
    if(myMember.roles.cache.has('865662634337239091')) {
      myMember.roles.remove(role)
      msg.channel.send(`Disabled color randomization for ${msg.user.username}`)
    } else {
      myMember.roles.add(role)
      msg.channel.send(`Enabled color randomization for ${msg.user.username}`)
    }

  }
}

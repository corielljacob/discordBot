const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'randomcolor',
  description: 'Sets jacobs role to a random color',
  async execute(msg) {
    var cobRole = msg.client.guilds.cache.get('512994325307850753').roles.cache.get('512995592100904960');
    cobRole.setColor('#AABBCC');
  }
}

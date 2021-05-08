const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'randomcolor',
  description: 'Sets jacobs role to a random color',
  async execute(msg, flag) {
    var cobRole = msg.client.guilds.cache.get('512994325307850753').roles.cache.get('512995592100904960');
    var newColor = '';
    var myRandomNumber;
    var i;
    for(i = 0; i < 6; i++) {
      myRandomNumber = util.getRandomInt(16);
      newColor += myRandomNumber.toString(16);
    }
    console.log('Set color to ' + newColor);
    cobRole.setColor('#' + newColor);
    console.log(flag)
  }
}

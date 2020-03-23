const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'acnh',
  description: 'acnh turnip reminder',
  async execute(msg, time) {
    if(time === 0){
      msg.client.channels.get('512994325743927325').send(`<@&691633590231891979> It's a new day! Post your turnip prices before they change at noon relative to your timezone!`);
    } else if (time === 1){
    msg.client.channels.get('512994325743927325').send(`<@&691633590231891979> Remember to post your post-noon turnip prices!`);
  } else if (time === null){
    msg.client.channels.get('512994325743927325').send(`This command is used to send the daily turnip messages. It has no other functionality.`);
  }
  }
}

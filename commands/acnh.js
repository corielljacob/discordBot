const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'acnh',
  description: 'acnh turnip reminder',
  async execute(msg, time) {
    //time = 0;
    if(time === 0){
      msg.client.channels.get('537142011455733770').send(`<@&598889483995185173> It's a new day! Post your turnip prices before they change at noon relative to your timezone!`);
    } else if (time === 1){
    msg.client.channels.get('537142011455733770').send(` Remember to post your post-noon turnip prices!`);
  }
  }
}

const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'woah',
  description: 'Sends Hansen?',
  async execute(msg, args) {
    while (true) {
      util.hansen(1, msg);
    }
  }
}

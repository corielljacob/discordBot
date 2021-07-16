const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
const util = require('../utility.js');
module.exports = {
  name: 'randomcolor',
  description: 'Sets role to a random color',
  execute(msg, intended) {
    var role;
    if (intended) {
      this.randomizeColor(msg.user)
    } else {
      role = msg.client.guilds.cache.get('512994325307850753').roles.cache.get('865662634337239091')
      //role.members.each(user => this.randomizeColor(user))

      role.members.forEach(userWithRole => {
        this.randomizeColor(userWithRole)
      })
    }

  },
  randomizeColor(user) {
    var newColor = '';
    var myRandomNumber;
    var i;
    for (i = 0; i < 6; i++) {
      myRandomNumber = util.getRandomInt(16);
      newColor += myRandomNumber.toString(16);
    }
    var currentdate = new Date();
    var datetime = currentdate.toLocaleString()
    console.log('Set color of role to #' + newColor + ' for ' + user.nickname + ' at ' + datetime)
    user.roles.color.setColor('#' + newColor);
  }
}

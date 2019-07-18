const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
module.exports = {
  name: 'oldflorida',
  description: 'Displays random story about florida man',
  async execute(msg, args) {
    page = parseInt(this.getRandomInt(6))
    var newsKey = process.env.news_key
    const body = await fetch('https://newsapi.org/v2/everything?q="florida man"&apiKey=' + newsKey + '&page=' + page).then(response => response.json());
    var obj = eval(body.articles)
    var index = this.getRandomInt(20)
    var i = 0
    for (var key in obj) {
      if (i === index) {
        msg.channel.send('**' + obj[key].title + '**\n' + obj[key].description + '\n\n' + obj[key].content + '\n\nRead the full story here: <' + obj[key].url + '>')
        return;
      } else {
        i++;
      }
    }
    //console.log(page)
  },
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
};

const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
module.exports = {
  name: 'morggyweather',
  description: 'Gets the weather for Morgan',
  async execute(msg, args) {
    var key = process.env.weather_key

    //api.openweathermap.org/data/2.5/weather?q=Cypress&appid=132f7368978dfbf97c3d94d57c81e72a&units=imperial
    //var body = await fetch('https://www.googleapis.com/customsearch/v1?' + q + '&' + num + '&' + start + '&' + imgSize + '&' + searchType + '&' + key + '&' + cx)
    var body = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Cypress&appid=' + key + '&units=imperial')
    .then(response => {
      if (!response.ok) {
        console.log('error with call to get morgan weather!')
        throw response
      }
      return response.json()
    })

    var weather_icon_code = body.weather[0].icon;
    //https://openweathermap.org/img/wn/04d.png
    var weather_icon_url = 'https://openweathermap.org/img/wn/' + weather_icon_code + '.png'

    const apodEmbed = new Discord.MessageEmbed()
      .setColor('#39ff14')
      .setTitle(`Weather for Cypress CA`)
      .setAuthor(`Morgan's Weather`)
      //.setDescription(body.explanation)
      .setThumbnail(weather_icon_url)
    msg.channel.send(apodEmbed)
  },
};
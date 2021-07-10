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
    var current_temp = body.main.temp + '°F';
    var low = body.main.temp_min + '°F';
    var high = body.main.temp_max + '°F';
    var humidity = body.main.humidity + '%';
    var wind_speed = body.wind.speed + ' MPH'
    var morg_color = msg.guild.members.cache.get('226953288841560074').displayHexColor
    //https://openweathermap.org/img/wn/04d.png
    var weather_icon_url = 'https://openweathermap.org/img/wn/' + weather_icon_code + '.png'

    const weatherEmbed = new Discord.MessageEmbed()
      .setColor(morg_color)
      .setAuthor(`Morgan's Weather`)
      //.setDescription(body.explanation)
      .addFields({
        name: 'Current',
        value: current_temp,
        inline: true
      }, {
        name: 'Today\'s Low',
        value: low,
        inline: true
      }, {
        name: 'Today\'s High',
        value: high,
        inline: true
      }, )
      .addFields({
        name: 'Humidity',
        value: humidity,
        inline: true
      }, {
        name: 'Avg Wind Speed',
        value: wind_speed,
        inline: true
      }, )
      .setThumbnail(weather_icon_url)
      .setFooter('Weather for Cypress, CA by OpenWeather');
    msg.channel.send(weatherEmbed)
  },
};

const config = require('../config.json');
const mongo = require('mongodb').MongoClient;
const util = require('../utility.js');
const fetch = require('node-fetch');
const Discord = require('discord.js');
const dburl = process.env.dbconnection
var db, collection;

module.exports = {
  name: 'weather',
  description: 'Provides weather for a given user',
  async execute(msg, args) {
    if (!msg.mentions.users.size) {
      return msg.channel.send('You need to specify a correct user.')
    }
    const user = msg.mentions.users.first()
    var loc = 'null'

    mongo.connect(dburl, {
      useNewUrlParser: true
    }, (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      db = client.db('discordbot')
      collection = db.collection('piclinks')
      collection.find().toArray((findErr, items) => {
        items.forEach(function(element) {
          if (element.id == user.id) {
            if (element.location != 'null') {
              loc = element.location;
              lat_long = element.lat_long;
            }
          }
        })
        this.buildEmbed(msg, user, loc);
      })
    })
  },
  async buildEmbed(msg, user, loc) {
    if(loc == 'null' || loc == null) {
      const cob = msg.client.users.cache.get('206236812916555776');
      msg.channel.send(`User either not registered in database or does not have a location stored. DM ${cob} your city to get registered.`)
    } else {
      var key = process.env.weather_key
      //var body = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + loc +'&appid=' + key + '&units=imperial')
      var body = await fetch('https://api.openweathermap.org/data/2.5/onecall?' + lat_long + '&exclude=hourly,minutely&appid='+ key +'&units=imperial')
        .then(response => {
          if (!response.ok) {
            console.log(`error with call to get weather for ${user.id}!`)
            throw response
          }
          return response.json()
        })

      var weather_icon_code = body.current.weather[0].icon;
      var current_temp = parseInt(body.current.temp)
      var current_celcius = parseInt(util.farenToCelcius(current_temp))
      var low = parseInt(body.daily[0].temp.min)
      var low_celcius = parseInt(util.farenToCelcius(low))
      var high = parseInt(body.daily[0].temp.max)
      var high_celcius = parseInt(util.farenToCelcius(high))
      var humidity = body.current.humidity + '%';
      var wind_speed = body.current.wind_speed + ' MPH'
      var weather_icon_url = 'https://openweathermap.org/img/wn/' + weather_icon_code + '.png'

      //var daily = body.daily[0]

      const weatherEmbed = new Discord.MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .setAuthor(`${user.username}'s Weather`)
        .addFields({
          name: 'Current',
          value: current_temp + '°F \\ ' + current_celcius + '°C',
          inline: true
        }, {
          name: 'Today\'s Low',
          value: low + '°F \\ ' + low_celcius + '°C',
          inline: true
        }, {
          name: 'Today\'s High',
          value: high + '°F \\ ' + high_celcius + '°C',
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
        .setFooter(`Weather for ${loc} by OpenWeather`);
      msg.channel.send(weatherEmbed)
    }
  },
};

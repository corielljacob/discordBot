const config = require('../config.json');
const mongo = require('mongodb').MongoClient;
const util = require('../utility.js');
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
            }
          }
        })
        this.buildEmbed(msg, user, loc);
      })
    })
  },
  async buildEmbed(msg, user, loc) {
    if(loc == 'null' || loc == null) {
      msg.channel.send('User either not registered in database or does not have a location stored')
    } else {
      var key = process.env.weather_key
      var body = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + loc +'&appid=' + key + '&units=imperial')
        .then(response => {
          if (!response.ok) {
            console.log(`error with call to get weather for ${user.id}!`)
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

      const weatherEmbed = new Discord.MessageEmbed()
        .setColor(msg.member.displayHexColor)
        .setAuthor(`${user.username}'s Weather`)
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
        .setFooter(`Weather for ${loc} by OpenWeather`);
      msg.channel.send(weatherEmbed)
    }
  },
};

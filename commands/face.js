const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
module.exports = {
  name: 'face',
  description: 'Prompts user to send a face pic for evaluation',
  async execute(msg, args) {
    msg.channel.send("Send image you want to evaluate");
    const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, {
      time: 20000
    });

    collector.on('collect', async message => {
      if (message.attachments.size === 0) {
        return;
      }
      var url = message.attachments.first().url
      var apiKey = process.env.face_key
      var apiSecret = process.env.face_secret
      const resp = await fetch('https://api-us.faceplusplus.com/facepp/v3/detect?api_key=' + apiKey + '&api_secret=' + apiSecret + '&image_url=' + url + '&return_attributes=gender,age,smiling,beauty,emotion,ethnicity', {
        method: 'POST'
      }).then(response => response.json());
      if (resp == null || resp.faces == null || resp.faces[0] == null) {
        message.channel.send("There was a problem parsing this picture. Please try again with a different picture.")
        return;
      }
      //var gender, smiling, age, emotion
      var attr = resp.faces[0].attributes

      msg.channel.send('__**Analysis**__\n(Any numeric scores are out of 100)\n' + '__Gender__: ' + attr.gender.value + '\n__Age__: ' + attr.age.value + '\n__Emotions__:\n\tSadness value: ' + attr.emotion.sadness + '\n\tNeutral value: ' + attr.emotion.neutral + '\n\tDisgust value: ' + attr.emotion.disgust + '\n\tAnger value: ' + attr.emotion.anger + '\n\tSurprise value: ' + attr.emotion.surprise + '\n\tFear value: ' + attr.emotion.fear + '\n\tHappiness: ' + attr.emotion.happiness + '\n__Beauty score__: ' + '\n\tMale score: ' + attr.beauty.male_score + '\n\tFemale score: ' + attr.beauty.female_score + '\n__Ethnicity__: ' + attr.ethnicity.value)
      collector.stop()
    })

    collector.on('end', collected => {
      var arr = collected.array()
			var val = false
      arr.forEach(function(element) {
        if (element.attachments.size > 0)
					val = true
      });
			if(val === false){
				msg.channel.send('You did not send any pictures')
			}
    });

  },
};

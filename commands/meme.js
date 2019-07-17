const Discord = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');
module.exports = {
	name: 'dadjoke',
	description: 'Sends a dad joke received from API call',
	async execute(msg, args) {
    const body = await fetch('https://meme-api.herokuapp.com/gimme').then(response => response.json());
    var url = body.url
		webAttachment = new Discord.Attachment(url)
		msg.channel.send(webAttachment)
	},
};

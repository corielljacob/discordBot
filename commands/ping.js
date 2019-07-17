module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		message.channel.send('**Pong.**');
		//console.log(parseInt(this.getRandomInt(6)))
	},
	getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
};

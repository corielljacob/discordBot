module.exports = {
	name: 'dadjoke',
	description: 'Sends a dad joke received from API call',
	async execute(message, args) {
    const body = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => response.json());
    console.log(body.joke)
	},
};

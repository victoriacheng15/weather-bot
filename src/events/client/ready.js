const { Events } = require("discord.js");

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`The bot ${client.user.tag} has logged in and online`);
	},
};

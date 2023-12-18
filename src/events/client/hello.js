const { Events } = require("discord.js");

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.content === "hello") {
			message.reply("Hey there! from hello.js");
		}

		if (message.content === "hey") {
			await message.channel.send("hey there! without reply from hello.js");
		}
	},
};

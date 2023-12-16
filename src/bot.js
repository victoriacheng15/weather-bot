require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const { BOT_TOKEN } = process.env;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.once("ready", async () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.login(BOT_TOKEN);

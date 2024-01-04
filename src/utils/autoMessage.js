const schedule = require("node-schedule");
const { getWeatherInfo } = require("./fetchWeather");
const { CHANNEL_ID, CITY, COUNTRY_CODE } = require("./env");

const time = "0 6 * * *";

async function autoMessage(client) {
	const { temp, min_temp, max_temp, humidity } = await getWeatherInfo(
		CITY,
		COUNTRY_CODE,
	);

	const weatherMdg = `Feeling curious about the weather in ${CITY} today? ️ It's currently ${temp}c, with a low of ${min_temp}c and a high of ${max_temp}c. Humidity's at ${humidity}%, so dress accordingly! `;

	schedule.scheduleJob(time, async () => {
		const channel = client.channels.cache.get(CHANNEL_ID);
		await channel.send(`${weatherMdg}`);
	});
}

module.exports = { autoMessage };

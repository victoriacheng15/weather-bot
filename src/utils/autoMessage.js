require("dotenv").config();
const schedule = require('node-schedule');
const {getWeatherInfo} = require("./fetchWeather")

const {CHANNEL_ID, CITY, COUNTRY_CODE} = process.env;

const time = "0 6 * * *"

async function autoMessage(client) {
  const info = await getWeatherInfo(CITY, COUNTRY_CODE)
  const {temp, min_temp, max_temp, humidity} = info

  const weatherMdg = `Feeling curious about the weather in ${CITY} today? ️ It's currently a cool ${temp}c, with a low of ${min_temp}c and a high of ${max_temp}c. Humidity's at ${humidity}%, so dress accordingly! `

  schedule.scheduleJob(time, async () => {
    const channel = client.channels.cache.get(CHANNEL_ID);
    await channel.send(`${weatherMdg}`);
});
}

module.exports = {autoMessage}
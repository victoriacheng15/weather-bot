const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {getWeatherInfo, formatTime, getTodayDate, formatLocation} = require("../../utils/fetchWeather")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Get the weather of a city")
    .addStringOption((option) =>
      option
        .setName("city")
        .setDescription("Enter the name of the city")
        .setRequired(true)
    )
    .addStringOption(option => 
      option
        .setName("country-code")
        .setDescription("Enter the country code of the city")
        .setRequired(true)
    ),

	async execute(interaction) {
    const city = interaction.options.getString("city");
    const countryCode = interaction.options.getString("country-code");
    const today = getTodayDate()
    const info = await getWeatherInfo(city, countryCode)
    const weatherDesc = `Display weather information for ${formatLocation({city, countryCode})} on ${today}`

    const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle("Weather Info")
    .setDescription(weatherDesc)
    .addFields(
      {
        name: "Temperature",
        value: `${info.temp}c`,
        inline: false,
      }, {
        name: "Min Temperature",
        value: `${info.min_temp}c`,
        inline: true,
      }, {
      
        name: "Max Temperture",
        value: `${info.max_temp}c`,
        inline: true,
      }, {
        name: "Humidity",
        value: `${info.humidity}%`,
        inline: false,
      },
      {
        name: "Sunraise",
        value: `${formatTime(info.sunrise)}`,
        inline: true,
      },
      {
        name: "Sunset",
        value: `${formatTime(info.sunset)}`,
        inline: false,
      },
      
    )

    await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
	},
};
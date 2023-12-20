const { SlashCommandBuilder, EmbedBuilder, MessageEmbed } = require("discord.js");
require("dotenv").config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName("weather")
		.setDescription("Get the weather of a city"),
	async execute(interaction) {
		const url =
			"https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=calgary&country=ca";
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": process.env.API_KEY,
				"X-RapidAPI-Host": process.env.API_HOST,
			},
		};
    let info;

		try {
			const response = await fetch(url, options);
			const data = await response.json();
      info = data
		} catch (error) {
			console.error(error);
		}

    console.log(info)
    const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle("Weather Info")
    .setDescription("Display the today's weather information for Calgary, AB")
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
        value: `${new Date(info.sunrise * 1000).toLocaleString().split(",").at(-1)}`,
        inline: true,
      },
      {
        name: "Sunset",
        value: `${new Date(info.sunset * 1000).toLocaleString().split(",").at(-1)}`,
        inline: false,
      },
      
    )

    await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });

	},
};

// {
//   cloud_pct: 75,
//   temp: 5,
//   feels_like: 3,
//   humidity: 65,
//   min_temp: 0,
//   max_temp: 9,
//   wind_speed: 2.06,
//   wind_degrees: 200,
//   sunrise: 1703086607,
//   sunset: 1703115058
// }


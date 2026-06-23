require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const axios = require('axios');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.on('ready', (c) => {
    console.log('🍔Randy put a shirt on');
}); 

/// Functions, I tried to keep it clean by only using this for API grabs //////
async function GrabCat() {
    try{
        const response = await axios.get ("https://api.thecatapi.com/v1/images/search", {
            headers: {'x-api-key': process.env.CAT_PICS}
        });
        return response.data[0].url;
    } catch (err) {
        console.error('Cat API Error:', err);
        return null;
    }
}
async function GrabWeather(location){         //decided to change to show a basic rundown instead of attempting annoying tables. Change the URL back from /current.json to /forecast.json if you decide to do table again
    try{
        const response = await axios.get ("http://api.weatherapi.com/v1/forecast.json", {
            params: {
                key: process.env.WEATHER_KEY,
                q: location,
                days: 3,
                aqi: 'no',
                alerts: 'yes',
            }
        });
        return response.data;
    } catch (err) {
        console.error('Weather API Error:', err);
        return null;
    }
}


//Commands, currently wanting to add an OSRS price checker into the bot//
client.on('messageCreate', async message => {
    if (message.author.bot) return;
    const prefix ='!';
    const action = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = action.shift().toLowerCase();
    console.log(`Executing command: ${cmd}`);

    const Dustin = /Dustin, say it/i; // No swearing allowed
    if (Dustin.test(message.content)) {
        return message.reply("Don't Say it");
    }

    if (cmd === 'ping'){
        return message.reply ('Pong! 🏓')
    }
    if (cmd === 'cat'){
        const catURL = await GrabCat();
        return message.channel.send({
            content: "Here's a good-looking kitty right here!",
            files: [catURL]
        });
}
if (cmd === 'weather'){
    const getForecast = action.join(' ');
    if (!getForecast) {
        return message.reply("You didn't say a city! Try doing: `!weather Chicago`");
    }
    const WeatherData = await GrabWeather(getForecast);
    return message.reply(
    `\`\`\`
        ⛅Carol Krabit with Today's Weather Report:

         Location: ${WeatherData.location.name}, ${WeatherData.location.region} 
         Current Forecast: ${WeatherData.current.condition.text} 
         Current Temperature: ${WeatherData.current.temp_f} 
         High Temperature: ${WeatherData.forecast.forecastday[0].day.maxtemp_f} 
         Low Temperature: ${WeatherData.forecast.forecastday[0].day.mintemp_f} 
    \`\`\``);
}
});

client.login(process.env.BOT_TOKEN);
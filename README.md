# Discord-Bot
A custom Discord bot that makes API calls to send real-time weather reports or random cat pictures using Axios and discord.js.

# How to Get Started
1. Clone the project folder to your computer.
2. Make sure you have Node.js installed. You can check your terminal by typing `node -v`. If you don't have it, download it from https://nodejs.org/.
3. In your terminal, navigate to the bot's folder:
   ```bash
   cd \DiscordBot
   
1. If you do not already have the required packages (_discord.js_ and _axios_), please run the following command:
```bash
npm install
```
2. Create a file named .env in the main directory of the project.
3. Login to the [Discord Developer Portal]([https://discord.com/developers]), create a new application, and generate a bot token.
Paste the new bot token into your .env file like this:
```code snippet
BOT_TOKEN="your_token_here"
```
4. Use the Discord Developer Portal installation tools to invite your new bot into your server.
5. Get a free API key from Weatherapi.com, and add it to your .env file like this:
```code snippet
WEATHER_KEY="your_weather_key_here"
```
6. Start the bot by typing this into your terminal:
```bash
node index.js
```

#Future Plans
- Add an OSRS grand Exchange price Checker using the (!ge item) command
- Add a !help command that lists all options available.
- Add a slot machine game with point-tracking memory.

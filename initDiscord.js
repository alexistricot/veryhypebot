const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
});

// login
client.login(process.env.TOKEN);

// declare the commands when the client is ready
client.once('ready', () => {
    console.log('Discord client ready.');
    // declare the available commands to the server
    const declareCommands = require('./declareCommands');
    declareCommands();
});

module.exports = client;

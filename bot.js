// get the discord client
const client = require('./initDiscord');

// interaction handling
const handleCommands = require('./handleCommands');
client.on('interactionCreate', handleCommands);

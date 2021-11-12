const config = require('./config.json');
const {
    SlashCommandBuilder,
    SlashCommandStringOption,
    // SlashCommandIntegerOption,
} = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const songs = require('./songs.json');

function buildSongOptions() {
    const option = new SlashCommandStringOption()
        .setName('song')
        .setDescription('The name of the song to play, or *help*.')
        .setRequired(true);
    for (const songName in songs) {
        option.addChoice(songName, songName);
    }
    option.addChoice('help', 'help');
    return option;
}

function postCommands(commandDeclarations) {
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
    rest.put(Routes.applicationGuildCommands(config['clientID'], config['guild']), {
        body: commandDeclarations,
    })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}

// main function
module.exports = function() {
    const startDeclaration = new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song in your current voice channel.')
        .addStringOption(buildSongOptions());
    const stopDeclaration = new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the current song from playing.');
    const commandDeclarations = [startDeclaration, stopDeclaration].map((command) =>
        command.toJSON(),
    );
    postCommands(commandDeclarations);
};

const play = require('./playSong');
const stop = require('./stopSong');
const printHelp = require('./printHelp');

module.exports = async function(interaction) {
    // check the interaction
    if (interaction.user.bot) return;
    if (!interaction.isCommand()) return;
    // get the argument
    switch (interaction.commandName) {
    case 'play':
        if (interaction.options.data.length && interaction.options.data[0].value == 'help') {
            await interaction.reply('`Working...`');
            printHelp(interaction);
        }
        else {
            await interaction.reply('`Working...`');
            play(interaction);
        }
        break;
    case 'stop':
        await interaction.reply('`Working...`');
        stop(interaction);
        break;
    default:
        break;
    }
};

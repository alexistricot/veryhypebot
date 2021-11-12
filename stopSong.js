const { getVoiceConnection } = require('@discordjs/voice');
const config = require('./config.json');
const replyToInteraction = require('./replyToInteraction');

module.exports = function(interaction) {
    // const voiceChannel = interaction.user?.voice.channel;
    const connection = getVoiceConnection(config['guild']);
    if (connection) {
        connection.destroy();
        replyToInteraction(interaction, 'Leaving.');
        console.log('Leaving.');
    }
};

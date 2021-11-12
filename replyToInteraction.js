module.exports = function(interaction, message) {
    if (interaction.replied) {
        interaction.editReply(message);
    }
    else {
        interaction.reply(message);
    }
};

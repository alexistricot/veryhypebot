const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
} = require('@discordjs/voice');
const replyToInteraction = require('./replyToInteraction');
const songs = require('./songs.json');
const songList = Object.keys(songs);
const config = require('./config.json');

module.exports = function(interaction) {
    const voiceChannel = getChannelFromInteraction(interaction);
    if (!voiceChannel) return;
    const connection = connectToChannel(voiceChannel);
    const player = createAudioPlayer();
    connection.subscribe(player);
    const songName = interaction.options.data[0]?.value;
    if (!songName || !songList.includes(songName)) {
        replyToInteraction(interaction, 'Not a valid song. Use `/play help` to see valid options.');
    }
    playSong(player, connection, songName);
    replyToInteraction(interaction, 'Playing.');
};

function playSong(player, connection, songName) {
    const pathToSong = require('path').join(__dirname, 'songs', songs[songName]['path']);
    const resource = createAudioResource(pathToSong, { inlineVolume: true });
    resource.volume.setVolume(+songs[songName]['volume']);
    player.play(resource);
    console.log(`Playing ${songName} from ${pathToSong} with volume ${+songs[songName]['volume']}`);
    player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
    });
}

function getChannelFromInteraction(interaction) {
    const guildMember = getGuildMember(interaction);
    const voiceChannel = guildMember?.voice?.channel;
    console.log(guildMember);
    console.log(guildMember?.voice);
    console.log(guildMember?.voice?.channel);
    if (!voiceChannel) {
        replyToInteraction(interaction, 'Join a voice channel then try again!');
    }
    return voiceChannel;
}

function connectToChannel(channel) {
    return joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
}

function getGuildMember(interaction) {
    const user = interaction.user;
    const client = interaction.client;
    const guild = client.guilds.cache.find((g) => g.id == config['guild']);
    return guild.members.cache.find((member) => member.user.id == user.id);
}

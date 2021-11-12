const fs = require('fs');
const songs = require('./songs.json');
const songList = Object.keys(songs);
const replyToInteraction = require('./replyToInteraction');

module.exports = function printHelp(interaction) {
    const readme = fs.readFileSync('./README.md');
    let output = readme.toString() + '\n';
    for (const songIndex in songList) {
        const songName = songList[songIndex];
        output += '***' + songName.toString() + '***' + ' : ';
        output += songs[songName]['description'] + '\n';
    }
    console.log(`Help was asked : \n\n ${output}`);
    replyToInteraction(interaction, output);
};

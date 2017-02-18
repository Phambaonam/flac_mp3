
const path = require('path');
let file = ['Flac/1/1.1/1.flac'];

/***
 * covert path .flac into .mp3 from array path
 * @param pathFlac
 * @returns {string}
 */
mp3Path = (pathFlac) => {
    let pathMp3 = '';
    pathFlac.forEach(file => {
        if (path.extname(file) === '.flac') {
            pathMp3 = file.replace('.flac', '.mp3');
        }
    });
    return pathMp3;
};

mp3Path(file);

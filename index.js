/**
 * Created by techmaster on 2/16/17.
 */

const path = require('path');
let file = 'Flac/1/1.1/1.flac';

mp3Path = (file) => {
    if (path.extname(file) === '.flac') {
        let mp3 = file.replace('.flac', '.mp3');
        return mp3;
    }
};

mp3Path(file);

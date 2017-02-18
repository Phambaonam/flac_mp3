/**
 * Created by techmaster on 2/16/17.
 */

const spawn = require('child_process').spawn;
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');

/***
 * Đây là class dùng để convert flac sang mp3. Tại sao phải dùng class bởi vì class sẽ lưu thêm
 */

class Converter {
    constructor(sourceFolder, destFolder) {
        this.sourceFolder = sourceFolder;
        this.destFolder = destFolder;
    }

    /**
     *
     * @param inputFile
     */
    //TODO: hãy viết hàm để tìm ra outputFile phù hợp dựa vào sourceFolder, destFolder và inputFile

    getOutputFile(inputFile) {
        let filename = inputFile.replace('.flac', '.mp3');
        let outputFile = this.destFolder.concat(`/${filename}`);
        return outputFile;
    }

    /***
     *
     * @param inputFile input file định dạng flac, output file có tên giống với input file extenstion là mp3
     */
    flacToMp3(filename) {
        return new Promise((resolve, reject) => {
            let inputFile = this.sourceFolder + `/${filename}`;
            let outputFile = this.getOutputFile(filename);

            const converter = spawn('ffmpeg', ['-y', '-i', inputFile, '-ab', '320k', '-map_metadata', '0', '-id3v2_version', '3', outputFile]);

            converter.stderr.on('data', (data) => {
                console.log(`${data}`);
            });

            converter.on('close', (code) => {
                if (code === 0) {
                    resolve(inputFile)
                } else {
                    reject('failed to convert');
                }
            });
        });

    }

}

let converter = new Converter();

converter.flacToMp3('1.1.flac');



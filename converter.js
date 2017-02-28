/**
 * Created by techmaster on 2/16/17.
 */
const spawn = require('child_process').spawn;
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

/***
 * Đây là class dùng để convert flac sang mp3. Tại sao phải dùng class bởi vì class sẽ lưu thêm
 */
exports.Converter = class {
    constructor(sourceFolder, destFolder) {
        this.sourceFolder = sourceFolder;
        this.destFolder = destFolder;
    }

    //TODO: hãy viết hàm để tìm ra outputFile phù hợp dựa vào sourceFolder, destFolder và inputFile
    /***
     *  Hàm này lọc ra các file flac
     * @param filesArrFlac
     * @returns {Array}
     */
    getArrMp3(filesArrFlac) {
        let mp3Flies = [];
        filesArrFlac.forEach((file) => {
            let mp3path = file.replace('.flac', '.mp3');
            mp3Flies.push(mp3path);
        });
        return mp3Flies;
    }


    /***
     *
     * @param inputFile input file định dạng flac, output file có tên giống với input file extenstion là mp3
     */
    flacToMp3(inputFile, outputFile) {
        return new Promise((resolve, reject) => {
            let tempdir = outputFile.replace("/" + path.basename(outputFile), '');
            shell.mkdir('-p', tempdir);
            const converter = spawn('ffmpeg', ['-n', '-i', inputFile, '-ab', '320k', '-map_metadata', '0', '-id3v2_version', '3', outputFile]);

            // converter.stderr.on('data', (data) => {
            //     console.log(`${data}`);
            // });

            converter.on('close', (code) => {
                if (code === 0) {
                    resolve(inputFile)
                } else {
                    reject(`File ${inputFile} caught error`);
                }
            });
        });

    }
};
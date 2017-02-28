//TODO: File này là file phối hợp giữa scanfile.js và converter.js

let scanFile = require('./scanfile').scanFile;
let converter = require('./converter').Converter;
const path = require('path');
const sourceFolder = __dirname + '/Flac';
const destFolder = __dirname + '/mp3';
const writer = require('fs').createWriteStream(__dirname + '/log.txt');
let count = 0;
let fileDone = 0;

/***
 *  Hàm này dùng để render files mp3 vào folder mp3 tương ứng.
 * @param arrFlac: Là 1 Array chứa files flac chưa convert.
 * @param arrMp3 : Là 1 Array chứa  files mp3.
 * @param convert : Là hàm callback để convert flac.
 * @param sumFiles : Tổng số file flac.
 */
renderFile = (arrFlac, arrMp3, convert, sumFiles) => {
    arrFlac.forEach((file, index) => {
        let inputFile = convert.sourceFolder + '/' + file;
        let outputFile = convert.destFolder + '/' + arrMp3[index];
        // count: chỉ convert 1 file, xong convert tiếp.
        if (count < 1) {
            count++;
            arrFlac.shift(); // loại bỏ những file đã convert rồi
            arrMp3.shift();  // loại bỏ những file đã tồn tại
            convert.flacToMp3(inputFile, outputFile)
                .then((success) => {
                    fileDone++;
                    checkTimeConvert(fileDone, sumFiles);
                    console.log(file + ' converted completed');
                    count--;
                    renderFile(arrFlac, arrMp3, convert, sumFiles);
                })
                .catch((err) => {
                    fileDone++;
                    checkTimeConvert(fileDone, sumFiles);
                    count--;
                    writer.write(err + '\n');
                    renderFile(arrFlac, arrMp3, convert, sumFiles);
                });
        }
    });
};
/***
 *  hàm này dùng để kiểm tra thời gian convert toàn bộ các e
 * @param countFile : Đếm số file đã quyét.
 * @param totalFiles : Tổng số file flac.
 */
checkTimeConvert = (countFile, totalFiles) => {
    if (countFile === totalFiles) {
        console.timeEnd("Sum time converted");
    }
};
/***
 *  dùng async để đợi tiến trình xử lý xong của hàm listAllFlac()
 * @param sourceFolder
 * @param destFolder
 * @returns {Promise.<void>}
 */
async function runner(sourceFolder, destFolder) {
    let myConvert = new converter(sourceFolder, destFolder);
    let myScanner = new scanFile(sourceFolder);
    let filesArrFlac = await myScanner.listAllFlac(sourceFolder);
    let filesArrMp3 = myConvert.getArrMp3(filesArrFlac);

    renderFile(filesArrFlac, filesArrMp3, myConvert, filesArrFlac.length);

}

console.time("Sum time converted");
runner(sourceFolder, destFolder);

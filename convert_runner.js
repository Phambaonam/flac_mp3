//TODO: File này là file phối hợp giữa scanfile.js và converter.js
const Converter = require("./converter");
const ScanFile = require("./scanfile");
const writer = require('fs').createWriteStream(__dirname + '/log.txt');
const srcFolder = __dirname + "/Flac";
const desFolder = __dirname + "/Mp3";
let count = 0;
/***
 Func chuyển .flac files thành .mp3 files
 Giới hạn 1 files 1 lần convert
 * @param arrFiles : mảng chứa đường dẫn tới các files .flac
 */


renderFile = (arrFlac, arrMp3, convert) => {
    let copyFlac = arrFlac.slice(0);
    let copyMp3 = arrMp3.slice(0);
    copyFlac.forEach((file, index) => {
        if (count < 2) {
            count++;
            arrFlac.shift();
            arrMp3.shift();
            convert.flacToMp3(file, copyMp3[index])
                .then((success) => {
                    count--;
                    if (arrFlac.length == 0) {
                        console.timeEnd('check time runner');
                    }
                    renderFile(arrFlac, arrMp3, convert);
                })
                .catch((error) => {
                    writer.write(error);
                    writer.close();
                    renderFile(arrFlac, arrMp3, convert);
                });
        }
    });
};

// Sau khi Merge
async function runner(srcFolder, desFolder) {
    let myConvert = new Converter.Converter(srcFolder, desFolder);
    let myScanner = new ScanFile.ScanFile(srcFolder);
    let fileArrFlac = await myScanner.listAllFlac(myScanner.srcFolder);
    let fileArrMp3 = myConvert.getOutputFile(fileArrFlac);
    renderFile(fileArrFlac, fileArrMp3, myConvert);
    console.log(countFile);
}

console.time('check time runner');
runner(srcFolder, desFolder);


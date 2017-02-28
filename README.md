# Ứng dụng convert flac to mp3

## Các kỹ thuật  
Demo kỹ thuật child-process, BlueBird promise

# Yêu cầu: 
1. Convert tất cả các file flac sang mp3.

2. Trong quá trình convert, file nào không convert được thì thông báo cho người dùng.

3. Giả sử thêm vài file flac mới vào folder flac trước đó. Hãy convert những file mới đó 
mà không convert lại những file đã convert rồi.

4. Đo thời gian convert file. Hãy tối ưu hóa để thời gian convert ngắn lại.

5. Viết Unit Test để kiểm thử. 

## Chạy thử ứng dụng
```
git clone https://github.com/Phambaonam/flac_mp3
cd flac_mp3

// Nhập đường dẫn của source folder chứa file flac và floder destination chứa file mp3 trên phần khai báo file convert_runner.js
 node  --harmony-async-await convert_runner.js (Sử dụng Async Await )
 
```
## Các kỹ thuật sử dụng

* Dùng module ffmpeg.js để convert file flac thành file mp3 :

```
spawn('ffmpeg', ['-y', '-i', 'music.flac', '-ab', '320k', '-map_metadata', '0', '-id3v2_version', '3', 'music.mp3']);
```

* Promise-bluebird , Async Await, Child-process.

* Module npm shelljs: Dùng tạo ra folder chứa file mp3.

## Các bước tiến hành:

### Scan file:

* Tìm kiếm tất cả các file trong thư mục.
* Chỉ lấy file có đuôi là flac.
* Cần tạo ra 1 Array chứa các file flac( chỉ chứa đường dẫn file) , sau này cần dùng  chúng để tạo ra destFolder. 

### Convert file:

* Vì chỉ convert từng file một nên cần tách Array chứa đường dẫn file flac để tạo ra folder chứa file mp3 và tìm ra file cần convert.

### Kết hợp 2 hàm scanFiles và convertFiles lại: 
* Vì mỗi hàm chỉ lên đảm nhiệm 1 chức năng duy nhất , nên ta dùng cách này để có thể tùy biến với yêu cầu đặt ra như: file bị lỗi, convert file theo ý muốn, đo thời gian hoàn thành convert  ...

## Chú ý:
* Trong bài toán này đều là xử lý bất đồng bộ, ta không biết quá trình nào sẽ xong trước, ta muốn quá trình xử lý tuần tự thì nên dùng promise kết hợp với Async  (trong code viết rất rõ).
* Để ý thấy bài toán có những bước giống nhau, từ quét file cho đến convert file: quét file trong folder lại gặp 1 folder con, convert xong file này thì lại tiếp tục convert tiếp đến file khác => Có thể dùng đệ quy cho bài toán này.
* Ở bài toán này khi ta thêm vào vài file flac mới, ta không muốn convert lại những file đã convert rồi thì có vài cách làm: xét trạng thái cho file đầu vào và file đầu ra, từ file đầu ra kiểm tra ngược lại file đầu vào..., nhưng để ý ở trong hàm convert file có sử dụng  ffmpeg, điều ch option giúp ta làm việc này nhanh hơn:  thay tham sô '-y' (overwrite) thành '-n', nó sẽ tự bỏ qua những file  đã convert.  
* Để tìm ra được thời gian convert, ta tìm tổng số file đầu vào và cho 1 biến đếm , mỗi lần convert file đầu vào cho tăng lên 1(file lỗi cũng tính), cho tới khi nào biến đếm = tổng số file thì coi như tính được thời gian convert, áp dụng logic này có thể sử dụng trong nhiều bài toán khác.




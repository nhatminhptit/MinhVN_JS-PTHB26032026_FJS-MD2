let chuyenCan = parseFloat(prompt("Tỉ lệ chuyên cần (%) của sinh viên", "100"));
let diemTrungBinh = parseFloat(prompt("Điểm trung bình của sinh viên", "8"));
let giayPhepDacBiet = confirm("Sinh viên này có giấy phép đặc biệt không?");

let duocDuThi = (chuyenCan >= 80 && diemTrungBinh >= 5) || giayPhepDacBiet;
console.log("Chuyên cần:", chuyenCan);
console.log("Điểm trung bình:", diemTrungBinh);
console.log("Giấy phép đặc biệt:", giayPhepDacBiet);
console.log("Được dự thi:", duocDuThi);

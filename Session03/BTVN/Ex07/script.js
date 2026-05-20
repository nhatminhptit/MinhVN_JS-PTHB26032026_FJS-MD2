let luong = +prompt("Nhập số tiền lương của bạn (triệu VNĐ):");
let tuoi = +prompt("Nhập số tuổi của bạn:");
let coNoXau = +prompt(
  "Bạn có nợ xấu không?\nNhập 0 nếu không có, nhập 1 nếu có!",
);

if (luong > 15 && tuoi >= 18 && tuoi <= 60 && !coNoXau) {
  alert("Chúc mừng! Bạn đủ điều kiện để vay vốn.");
} else {
  alert("Bạn không đủ điều kiện để thực hiện vay vốn!");
}

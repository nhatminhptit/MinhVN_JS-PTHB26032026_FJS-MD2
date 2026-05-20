let num = +prompt("Nhập một số bất kỳ từ bàn phím:");

while (isNaN(num)) {
  alert("Không phải số, xin hãy nhập lại!");
  num = +prompt("Nhập một số bất kỳ từ bàn phím:");
}

if (num < 0) {
  alert("Số âm!");
} else if (num > 0) {
  alert("Số dương!");
} else {
  alert("Số không!");
}

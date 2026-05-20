let n = +prompt("Nhập một số dương bất kỳ từ bàn phím:");

while (isNaN(n) || n <= 0) {
  alert("Không phải số dương, xin hãy nhập lại!");
  n = +prompt("Nhập một số dương bất kỳ từ bàn phím:");
}

let sum = 0;
for (let i = 2; i <= n; i += 2) {
  sum += i;
}

alert(`Tổng các số chẵn trong đoạn từ 1 đến ${n} là: ${sum}`);
console.log(`Tổng các số chẵn trong đoạn từ 1 đến ${n} là: ${sum}`);

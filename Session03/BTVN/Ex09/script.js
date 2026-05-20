let n = +prompt("Nhập số n để kiểm tra tính nguyên tố:");
while (isNaN(n)) {
  n = +prompt("Nhập số n để kiểm tra tính nguyên tố:");
}
let isPrime = n >= 2 ? true : false;

for (let i = 2; i * i <= n; i++) {
  if (n % i == 0) {
    isPrime = false;
    break;
  }
}

let msg = isPrime ? "Là số nguyên tố!" : "Không phải số nguyên tố!";
alert(msg);

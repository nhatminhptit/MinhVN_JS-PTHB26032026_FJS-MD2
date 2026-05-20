let n = +prompt("Nhập số n:");
let sum = 0;

while (n !== 0) {
  if (!isNaN(n)) sum += n;
  n = +prompt("Nhập tiếp số n (Nhập 0 để kết thúc):");
}

alert(sum);

let sum = 0;

for (let i = 1; i <= 50; i++) {
  if (i % 5 == 0) continue;
  console.log(i);
  sum += i;
  if (i > 200) break;
}

console.log("Tổng các số không chia hết cho 5 và đã được in ra là:", sum);

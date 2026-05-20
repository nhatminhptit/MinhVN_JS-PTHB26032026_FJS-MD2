let num = Math.floor(Math.random() * 100) + 1;
let lives = 5;
let isWin = true;
console.log(num);

while (lives--) {
  let inpNum = +prompt("Hãy thử đoán số trong đoạn từ 1 đến 100:");
  if (inpNum == num) {
    break;
  } else if (inpNum > num) {
    alert(`Số bạn đoán quá lớn! Bạn đang còn lại ${lives} lượt.`);
  } else {
    alert(`Số bạn đoán quá nhỏ! Bạn đang còn lại ${lives} lượt.`);
  }
  if (lives == 0) {
    isWin = false;
  }
}

let msg = isWin ? "Chúc mừng!" : "Game Over!";
alert(msg);

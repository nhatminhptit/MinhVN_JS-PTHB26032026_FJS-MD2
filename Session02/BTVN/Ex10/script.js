let numA = parseFloat(prompt("Nhập toán hạng thứ nhất:"));
let phepTinh = prompt("Nhập phép tính (+, - *, /, %):");
let numB = parseFloat(prompt("Nhập toán hạng thứ hai:"));

let ketQua;
let hopLe = true;

switch (phepTinh) {
  case "+": {
    ketQua = numA + numB;
    break;
  }
  case "-": {
    ketQua = numA - numB;
    break;
  }
  case "*": {
    ketQua = numA * numB;
    break;
  }
  case "/": {
    if (numB !== 0) {
      ketQua = numA / numB;
    } else {
      alert("Không thể chia một số cho 0!");
      hopLe = false;
    }
    break;
  }
  case "%": {
    if (numB !== 0) {
      ketQua = numA % numB;
    } else {
      alert("Không thể chia một số cho 0!");
      hopLe = false;
    }
    break;
  }
  default: {
    alert("Không thể chia một số cho 0!");
    hopLe = false;
  }
}

if (hopLe) {
  alert(`Kết quả của phép toán ${numA} ${phepTinh} ${numB} là: ${ketQua}`);
  console.log(
    `Kết quả của phép toán ${numA} ${phepTinh} ${numB} là: ${ketQua}`,
  );
}

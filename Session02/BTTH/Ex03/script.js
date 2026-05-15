let a = +prompt("Nhập số a:");
let b = +prompt("Nhập số b:");
let op = prompt("Nhập phép toán:");

switch (op) {
  case "+": {
    console.log(a + op + b + " =", a + b);
    break;
  }

  case "-": {
    console.log(a + op + b + " =", a - b);
    break;
  }

  case "*": {
    console.log(a + op + b + " =", a * b);
    break;
  }

  case "/": {
    console.log(a + op + b + " =", a / b);
    break;
  }

  case "%": {
    console.log(a + op + b + " =", a + b);
    break;
  }
  default: {
    console.log("Có lỗi");
  }
}

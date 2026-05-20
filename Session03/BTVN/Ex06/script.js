let w = +prompt("Nhập chiều rộng cho hình chữ nhật");
let h = +prompt("Nhập chiều cao cho hình chữ nhật");

let hcn = "";
for (let i = 1; i <= h; i++) {
  for (let j = 1; j <= w; j++) {
    hcn += "*";
  }
  hcn += "\n";
}

console.log(hcn);

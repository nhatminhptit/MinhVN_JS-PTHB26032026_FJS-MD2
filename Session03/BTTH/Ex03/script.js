let n = +prompt(
  "Danh sách đồ uống:\n1.Cafe, 2. Cam vắt, 3. Trà sữa, 4. Coca\nVui lòng nhập số tương ứng với đồ uống bạn chọn!",
);

switch (n) {
  case 1: {
    alert(`Bạn đã chọn Cafe!`);
    break;
  }
  case 2: {
    alert(`Bạn đã chọn Cam vắt!`);
    break;
  }
  case 3: {
    alert(`Bạn đã chọn Trà sữa!`);
    break;
  }
  case 4: {
    alert(`Bạn đã chọn Coca!`);
    break;
  }
  default: {
    alert("Món này không tồn tại!");
  }
}

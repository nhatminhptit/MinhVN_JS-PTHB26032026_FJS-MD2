const ADMIN_USER = "admin";
const ADMIN_PASS = "123456";

let username = prompt("Vui lòng nhập tên đăng nhập:");
let password = prompt("Vui lòng nhập mật khẩu:");

if (username === ADMIN_USER && password === ADMIN_PASS) {
  alert("Đăng nhập thành công!");
} else {
  alert("Đăng nhập thất bại!");
}

# Đồ án: Ứng dụng Quản lý Chi tiêu Cá nhân

Đây là một ứng dụng web Frontend giúp theo dõi và quản lý thu chi cá nhân theo từng tháng. Toàn bộ dữ liệu được lưu trữ trực tiếp trên trình duyệt (LocalStorage), không yêu cầu backend.

## 1. Chức năng chính

- **Quản lý giao dịch:** Cho phép người dùng thêm, xóa các khoản thu/chi. Tự động định dạng (format) số tiền theo chuẩn VNĐ ngay khi đang nhập liệu.
- **Quản lý danh mục & Hạn mức (Budget):** - Tạo và đặt hạn mức chi tiêu cho từng danh mục (Ăn uống, Tiền điện, Xăng xe...).
  - Áp dụng cơ chế **Xóa mềm (Soft Delete)**: Khi xóa một danh mục, danh mục đó sẽ bị ẩn đi ở hiện tại nhưng dữ liệu giao dịch ở các tháng trước vẫn được bảo toàn và tính toán chính xác.
- **Thống kê & Cảnh báo:** - Tính toán tổng thu, tổng chi và số dư theo từng tháng.
  - Hiển thị thanh tiến trình (Progress bar) cho từng danh mục. Tự động đổi màu (xanh, vàng, đỏ) và hiện cảnh báo bằng chữ khi chi tiêu vượt quá hạn mức.
- **Xử lý giao dịch chưa phân loại:** Cảnh báo và hỗ trợ người dùng phân loại lại các khoản chi tiêu mồ côi (không thuộc danh mục nào).
- **Giao diện Responsive:** Hiển thị tối ưu và tự động thay đổi layout trên cả màn hình Desktop và Mobile.

## 2. Công nghệ sử dụng

- **Ngôn ngữ:** HTML5, TypeScript.
- **CSS Framework:** Tailwind CSS (qua CDN).
- **Thư viện UI:** SweetAlert2 (Xử lý các hộp thoại, popup tương tác).
- **Lưu trữ:** Web Storage API (LocalStorage).
- **Build tool:** Vite.

## 3. Cài đặt và Khởi chạy

Để chạy dự án trên máy cá nhân, yêu cầu máy tính đã cài đặt sẵn [Node.js](https://nodejs.org/).

**Bước 1:** Clone repository về máy:
\`\`\`bash
git clone <link-repo-cua-ban>
cd <ten-thu-muc-repo>
\`\`\`

**Bước 2:** Cài đặt các thư viện cần thiết (Vite, TypeScript...):
\`\`\`bash
npm install
\`\`\`

**Bước 3:** Khởi chạy server development:
\`\`\`bash
npm run dev
\`\`\`

**Bước 4:** Mở trình duyệt và truy cập vào địa chỉ mặc định (thường là `http://localhost:5173`).
_(Nếu muốn test trên điện thoại, đảm bảo điện thoại và máy tính dùng chung Wi-Fi và chạy lệnh `npm run dev -- --host`)_

---

_Dự án được phát triển trong khuôn khổ bài tập/đồ án môn học._

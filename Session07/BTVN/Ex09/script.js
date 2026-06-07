"use strict";
class PaymentMethod {
    amount;
    constructor(amount) {
        this.amount = amount;
    }
}
class CreditCardPayment extends PaymentMethod {
    cardNumber;
    constructor(amount, cardNumber) {
        super(amount);
        this.cardNumber = cardNumber;
    }
    processPayment() {
        console.log("--- XỬ LÝ THANH TOÁN THẺ TÍN DỤNG ---");
        console.log(`Đang kết nối tới ngân hàng cho thẻ: ****-****-****-${this.cardNumber.slice(-4)}`);
        console.log(`Giao dịch thành công! Đã trừ ${this.amount} VNĐ.`);
    }
}
class PaypalPayment extends PaymentMethod {
    emailAccount;
    constructor(amount, emailAccount) {
        super(amount);
        this.emailAccount = emailAccount;
    }
    processPayment() {
        console.log("--- XỬ LÝ THANH TOÁN PAYPAL ---");
        console.log(`Đang xác thực tài khoản PayPal: ${this.emailAccount}...`);
        console.log(`Chuyển khoản thành công ${this.amount} VNĐ!`);
    }
}
// Khởi tạo đơn hàng 1 thanh toán qua thẻ tín dụng
let donHang1 = new CreditCardPayment(500000, "1234567890123456");
donHang1.processPayment();
let donHang2 = new PaypalPayment(250000, "khachhang@gmail.com");
donHang2.processPayment();

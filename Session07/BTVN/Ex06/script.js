"use strict";
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "Pending";
    OrderStatus["Shipped"] = "Shipped";
    OrderStatus["Delivered"] = "Delivered";
})(OrderStatus || (OrderStatus = {}));
class Order {
    id;
    status;
    constructor(id, status) {
        this.id = id;
        this.status = status;
    }
    getOrderStatus() {
        return this.status;
    }
}
let newOrder = new Order("121200", OrderStatus.Shipped);
console.log(newOrder.getOrderStatus());

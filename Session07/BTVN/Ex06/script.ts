enum OrderStatus {
  Pending = "Pending",
  Shipped = "Shipped",
  Delivered = "Delivered",
}

class Order {
  private id: string;
  private status: OrderStatus;
  constructor(id: string, status: OrderStatus) {
    this.id = id;
    this.status = status;
  }
  getOrderStatus(): string {
    return this.status;
  }
}

let newOrder = new Order("121200", OrderStatus.Shipped);
console.log(newOrder.getOrderStatus());

abstract class Shape {
  abstract calculateArea(): number;
  display() {
    console.log(`Diện tích: ${this.calculateArea()}`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(
    private width: number,
    private height: number,
  ) {
    super();
  }
  calculateArea(): number {
    return this.width * this.height;
  }
}

let tmp1 = new Circle(4);
tmp1.display();

let tmp2 = new Rectangle(5, 10);
tmp2.display();

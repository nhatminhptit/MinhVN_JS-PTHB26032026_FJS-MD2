"use strict";
class Shape {
    display() {
        console.log(`Diện tích: ${this.calculateArea()}`);
    }
}
class Circle extends Shape {
    radius;
    constructor(radius) {
        super();
        this.radius = radius;
    }
    calculateArea() {
        return Math.PI * this.radius * this.radius;
    }
}
class Rectangle extends Shape {
    width;
    height;
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    calculateArea() {
        return this.width * this.height;
    }
}
let tmp1 = new Circle(4);
tmp1.display();
let tmp2 = new Rectangle(5, 10);
tmp2.display();

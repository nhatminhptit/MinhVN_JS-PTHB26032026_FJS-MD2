"use strict";
class Car {
    brand;
    year;
    constructor(brand, year) {
        this.brand = brand;
        this.year = year;
    }
    getDetails() {
        console.log(`Hãng xe: ${this.brand}`);
        console.log(`Năm sản xuất: ${this.year}`);
    }
}
let vf3 = new Car("VinFast", "2026");
vf3.getDetails();

class Car {
  public brand: string;
  public year: string;
  constructor(brand: string, year: string) {
    this.brand = brand;
    this.year = year;
  }
  getDetails(): void {
    console.log(`Hãng xe: ${this.brand}`);
    console.log(`Năm sản xuất: ${this.year}`);
  }
}

let vf3 = new Car("VinFast", "2026");
vf3.getDetails();

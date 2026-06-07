class Animal {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  makeSound() {
    console.log(`${this.name} đang phát ra tiếng!`);
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  makeSound(): void {
    console.log(`Gau gau`);
  }
}

let dog = new Dog("Shiba");
dog.makeSound();

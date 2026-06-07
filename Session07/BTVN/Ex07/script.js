"use strict";
class Animal {
    name;
    constructor(name) {
        this.name = name;
    }
    makeSound() {
        console.log(`${this.name} đang phát ra tiếng!`);
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    makeSound() {
        console.log(`Gau gau`);
    }
}
let dog = new Dog("Shiba");
dog.makeSound();

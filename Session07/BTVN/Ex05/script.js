"use strict";
class Employee {
    name;
    salary;
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    getSalary() {
        return this.salary;
    }
}
let tmpEm = new Employee("Minh", 25000);
console.log(tmpEm.getSalary());
// console.log(tmpEm.salary);
// Property 'salary' is private and only accessible within class 'Employee'.

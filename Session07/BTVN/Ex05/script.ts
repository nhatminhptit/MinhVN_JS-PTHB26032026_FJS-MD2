class Employee {
  public name: string;
  private salary: number;
  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }
  getSalary(): number {
    return this.salary;
  }
}

let tmpEm = new Employee("Minh", 25000);
console.log(tmpEm.getSalary());
// console.log(tmpEm.salary);
// Property 'salary' is private and only accessible within class 'Employee'.

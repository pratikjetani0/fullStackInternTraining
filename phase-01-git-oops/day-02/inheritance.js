class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  describe() {
    console.log(`${this.year} ${this.make} ${this.model}`);
  }
}

class Car extends Vehicle {
  constructor(make, model, year, numberOfDoors) {
    super(make, model, year);
    this.numberOfDoors = numberOfDoors;
  }
  describe() {
    console.log(`${this.year} ${this.make} ${this.model}`);
    console.log(`No of Doors: ${this.numberOfDoors}`);
  }
}

class Bike extends Vehicle {
  constructor(make, model, year, hasSidecar) {
    super(make, model, year);
    this.hasSidecar = hasSidecar;
  }
  describe() {
    console.log(`${this.year} ${this.make} ${this.model}`);
    console.log(`Has side car: ${this.hasSidecar ? 'YES' : 'NO'}`); 
  }
}

const car1 = new Car("Toyota", "Fortuner", 2022, 4);

const bike1 = new Bike("Royal Enfield", "Classic 350", 2022, true);

car1.describe();
bike1.describe();

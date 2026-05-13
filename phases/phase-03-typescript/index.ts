// let message: string = "Hello TypeScript!";
// console.log(message);

// let age: number = 21
// age = "hello"
// console.log(age)

// function sum(a: number, b: number) {
//   return a + b;
// }

// console.log(sum(2, 3));

// let city: string = "Ahmedabad";
// let marks: number = 90;
// let passed: boolean = true;

// console.log(city);
// console.log(marks);
// console.log(passed);

//! Array
// let nums: number[] = [1, 2, 3, 4]

// nums.push(90)

// console.log(nums);

// let fruits : string[] = ['apple', 'mango']
// console.log(fruits);

//! Objects
// let user: {
//   name: string;
//   age: number;
// } = {
//   name: "Pratik",
//   age: 21,
// };

// console.log(user); // { name: 'Pratik', age: 21 }

//! Funcions
// function greet (name: string) : string {
//     return "Hello " + name
// }

// console.log(greet("Pratik")); // Hello Pratik

//! Optionla Chaining
// function greet (name?: string) : string {
//     return ("Hello " + (name || "Guest"))
// }

// console.log(greet()); // Hello Guest
// console.log(greet('Pratik')); // Hello Pratik

//! Union Types

// let id: string | number;

// id = "101"
// id = 101

//! Type Alias

// type User = {
//   name: string;
//   age: number;
// };

// let user: User = {
//   name: "Pratik",
//   age: 21,
// };

// console.log(user); // { name: 'Pratik', age: 21 }

//! Interface

// interface User {
//   name: string;
//   age: number;
// }

// let user: User = {
//   name: "Pratik",
//   age: 21,
// };

// console.log(user); // { name: 'Pratik', age: 21 }

// interface Animal {
//   name: string;
//   age: number;
// }

// // Dog has everything Animal has, PLUS its own properties
// interface Dog extends Animal {
//   breed: string;
//   isVaccinated: boolean;
// }

// const myDog: Dog = {
//   name: "Bruno",
//   age: 3,
//   breed: "Labrador",
//   isVaccinated: true
// };

// console.log(myDog); //{ name: 'Bruno', age: 3, breed: 'Labrador', isVaccinated: true }


//! Literal Types
// let direction: "left" | "right";
// direction = "left"

// console.log(direction);

//! Unknown

// let value: unknown = "hello";

// if (typeof value === "string") {
//   console.log(value.toUpperCase());
// }

//! enum

enum Role {
  Admin,
  User,
  Guest
}

let myRole: Role = Role.User;

console.log(myRole);// 1

//! Classes
// class Person {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }

//   greet(): void {
//     console.log("Hello " + this.name); 
//   }
// }

// const user = new Person("Pratik")
// user.greet() 

//! Generics

// function identity<T>(value : T) : T {
//     return value 
// }

// console.log(identity<string>("Pratik"));
// console.log(identity<number>(21));


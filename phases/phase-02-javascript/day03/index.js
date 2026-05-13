//! Variable
// var age = 90;
// console.log(age) //90

// console.log(age) // undefined
// var age = 90;

// let age = 20;
// console.log(age) // 20

// console.log(age) // Cannot access 'age' before initialization (TDZ)
// let age = 20;

// console.log(age) // Cannot access 'age' before initialization (TDZ)
// const age = 20;

//! DataType

// let num =4;
// console.log(typeof(num)); // number

// let isMale = true
// console.log(typeof(isMale)); // boolean

// let y = null;
// console.log(typeof (y)); //object

// let z;
// console.log(typeof (z)); //undefined

// let obj = {
//   name: "Pratik",
//   age: 20,
// };
// console.log(obj);
// console.log(obj.name);
// console.log(obj["age"]);
// console.log(typeof obj); //object

// let arr = [1, 2, 3, 4, 5 , "Pratik" , "hello"];
// console.log(arr);
// console.log(arr[6]);
// console.log(typeof (arr)); //object

// let fun = function () {
//     console.log("Hello");
// }
// fun();
// console.log(typeof (fun)); //function

//! Operators

// Arithmetic oprator
// let numOne = 10;
// let numTwo = 5;
// console.log(numOne + numTwo); //15
// console.log(numOne - numTwo); //5
// console.log(numOne * numTwo); //50
// console.log(numOne / numTwo); //2
// console.log(numOne % numTwo); //0
// console.log(numOne ** numTwo); // 100000

// Unary operator
// let a = 10;
// console.log(a++); // post increment // 10
// console.log(a--); // post decrement // 11

// console.log(++a); // pre increment //11
// console.log(--a); // pre decrement //10

// Assignment operator
// let a = 10;
// let b = 5;
// console.log(a += b); // 15
// console.log(a -= b); // 5
// console.log(a *= b); // 50
// console.log(a /= b); // 2
// console.log(a %= b); //0
// console.log(a **= b);  //100000

// Compariosn operator
// let a = 10;
// let b = "10";
// console.log(a == b); // true
// console.log(a === b); //false // it will check the value as well as the data type
// console.log(a != b); //false // it will check the value
// console.log(a !== b); // true // it will check the value as well as the data type
// console.log(a > b); // false
// console.log(a < b); // false
// console.log(a >= b); // true
// console.log(a <= b); // true

// Ternary operator
// let a = 10;
// let b = 5;
// console.log(a > b ? "true" : "false"); // true

// Logical operator
// if (true && false) {
//     console.log("true");
// } else {
//     console.log("false"); // print
// }

// if (true || false) {
//     console.log("true"); //print
// } else {
//     console.log("false");
// }

// if (!true) {
//     console.log("true");
// } else {
//     console.log("false"); //print
// }

// if (null ?? "hello") {
//     console.log("true"); //print // left side null or undefined so it will goes in if part
// } else {
//     console.log("false");
// }

//! String

// let str = "Hello"
// console.log(str) // str

// console.log("Hello " + "World" ); //Hello World

// let name = "Pratik";
// let age = 20;
// console.log(`My name is ${name} and age is ${age}`); //My name is Pratik and age is 20

// String Method in js
let name = "Pratik Jetani";
let str = "hello world      ";
// console.log(name.toUpperCase()); //PRATIK JETANI

// console.log(name.toLowerCase()); //pratik jetani

// console.log(str.trim()); //pratikjetani // remove the space in last

// console.log(name.slice(0, 4)); //Prat // it will print the string from 0 to 4

// console.log(name.replace("Pratik", "Pratik Jetani")); // Pratik Jetani Jetani

// console.log(name.split(" ")); //[ 'Pratik', 'Jetani' ] // it will convert the string into array (if apply space do spilit with space other wise do with character)

// console.log(name.concat(str)); //Pratik Jetanihello world

// console.log(name.charAt(4)); //i // it will print the char at index 4
// console.log(name.repeat(2)); //Pratik JetaniPratik Jetani //it will print the string 3 times

//! Functions

// function sum(a, b) { // argument // declaration time
//     return a + b;
// }

// let ans = sum(5, 5); // parameter // calling time
// console.log(ans);

// const sayHello = () => {
//     console.log("Hello");
// }

// sayHello();

//! Conditional Statements
// if else

// let age = 20;
// if (age > 18) {
//     console.log("Do voting");
// } else {
//     console.log("Do not voting");
// }

// if elseif else
// let age = 89;
// if (age < 18) {
//     console.log("student");
// } else if (age >= 18 && age <= 50) {
//     console.log("working man");
// } else{
//     console.log("Retire man")
// }

//! Loops
// for (let i = 0; i < 10; i++) {
//     console.log(i);
// }

//in this we have itrate over object of each key

// let obj = {
//     name: "Pratik",
//     age: 20,
//     city: "Nashik"
// }
// for (let i in obj) {
//     console.log(i);
// }

// in this we have itrate over string of each char
// for (let i of "hello") {
//     console.log(i);
// }

// let i = 0;
// while (i < 10) {
//     console.log(i);
//     i++;
// }

//! Arrays

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// console.log(arr.length);
// console.log(arr[5]);

// arr[5] = "hello";
// console.log(arr[5]);
// console.log(arr);

// ! Some Operations/methods on ararys

// const arr = [1, 2, 3, 4, 5, 6, 7, 7];
// const SName = ["Alex", "Sachin", "Rohit", "Dhoni"];

// SName.push("Kohli");// [ 'Alex', 'Sachin', 'Rohit', 'Dhoni', 'Kohli' ]

// SName.pop(); // [ 'Alex', 'Sachin', 'Rohit' ]

// SName.unshift("Pratik"); // [ 'Pratik', 'Alex', 'Sachin', 'Rohit', 'Dhoni' ]

// SName.shift(); // [ 'Sachin', 'Rohit', 'Dhoni' ]

// console.log(SName.indexOf("Alex"));// 0

// const ans = SName.concat("Pratik", "Jhon"); // [ 'Alex', 'Sachin', 'Rohit', 'Dhoni', 'Pratik', 'Jhon' ]

// const ans = SName.includes("Pratik"); // false

// SName.reverse(); // [ 'Dhoni', 'Rohit', 'Sachin', 'Alex' ]

// SName.sort(); // [ 'Alex', 'Dhoni', 'Rohit', 'Sachin' ]

// let ans = arr.find(num => num > 5); // 6

// let ans = arr.slice(2, 5); // [ 3, 4, 5 ]

// let ans = arr.splice(2, 5); // [ 3, 4, 5, 6, 7 ]


// let ans = arr.join("-"); // 1-2-3-4-5-6-7-7

// let ans = arr.some(num => num > 15); // false

// let ans = arr.every(num => num < 15); // true

// SName.forEach(function (element) { 
//     console.log(element); //Alex Sachin Rohit Dhoni
// })

// SName.map(function (element) { 
//     console.log(element); //Alex Sachin Rohit Dhoni
// })

// let ans = arr.filter(num => num % 2 == 0); // [ 2, 4, 6 ]

// let ans = arr.reduce((acc, num) => acc + num, 0); // 35

// console.log(ans);

// console.log(SName);

//! Objects

// var student = {
//   name: "Mary", 
//   age: 10 
// }
// console.log(student.name); // Mary
// console.log(student["age"]); //10

// const person = {
//   name: "Pratik",
//   greet: function() {
//     console.log("Hello, my name is " + this.name); //Hello, my name is Pratik
//   }
// };

// person.greet();

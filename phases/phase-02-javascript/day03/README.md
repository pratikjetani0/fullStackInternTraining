# JavaScript

- JavaScript is the programming language of the web.
- It allows us to take our pages from static web pages to dynamic web applications.

## Variables

- var : functional scope (Variable can be redeclared & updated)
- let : block scope (Variable cannot be redeclared but can be updated)
- const : block scope (Variable cannot be redeclared or updated)

## Data Types

### Primitive Types

- Integer(number) , Boolean , undefined , null

### Reference Type

- Objects, Arrays ,functions

## Oprators

**Arithmetic oprator** : + , - , \* , / , %(modulus), \*\*(exponent)

**Unary operator** : increment, decrement (post and pre)

**Assignment operator** : = , += , -= , \*= , /= , %= , \*\*=

**Compariosn operator** : == , === , != , !== , > , < , >= , <=

**Ternary operator** : condtion ? true : false

**Logical operator** : &&, ||, !, ??

## String

- Strings, another basic data type, represent a string (or sequence) of characters.
- It is a sequence of characters used to represent text.

- Template literals in string

```js
let name = "Pratik";
let age = 20;
console.log(`My name is ${name} and age is ${age}`);
```

- Perform all string in-built methods opration in `index.js` file.

## Undefined

- Variables are only stored as undefined if they have been declared but not instantiated with a value.

## Null

- Null values intentionally are stored as null to indicate that the variable is empty.

## Functions

- Functions allow us to repeat tasks that involve a similar sequence of steps.

```js
function sum(a, b) {
  return a + b;
}
let ans = sum(5, 5);
console.log(ans);
```

- Arrow Functions

```js
const sayHello = () => {
  console.log("Hello");
};
sayHello();
```

## Conditional Statements

- Using this we can control the flow of our program.

- `if else`

```js
let age = 20;
if (age > 18) {
  console.log("Do voting");
} else {
  console.log("Do not voting");
}
```

- `if elseif else`

```js
let age = 37;
if (age < 18) {
  console.log("student");
} else if (age >= 18 && age <= 50) {
  console.log("working man");
} else {
  console.log("Retire man");
}
```

## Loops

- `while` : if you don't know how many times it will run.

```js
let i = 0;
while (i < 10) {
  console.log(i);
  i++;
}
```

- `for` : if you know how many times it will run.

```js
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

- `for in` : It is used to iterate over the keys of an object.

```js
let obj = {
  name: "Pratik",
  age: 20,
  city: "Nashik",
};
for (let i in obj) {
  console.log(i);
}
```

- ` for of` : It is used itrate over string of each character.

```js
for (let i of "hello") {
  console.log(i);
}
```

## Arrays

- Arrays are collection of data/items.
- Arrays is heterogeneous , beacause we can store different type of data in one array.

- `toString` : Convert array in to string
- `push` : It will add the element at the end
- `pop` : it will remove the last element
- `unshift` : it will add the element at the start
- `shift` : it will remove the first element
- `indexOf` : return index of the element
- `concat` : it will add the element at the end
- `includes` : it will return true or false
- `reverse` : it will reverse the array
- `sort` : it will sort the array
- `find` : find particular element in array
- `slice(start, end)`: Gate the particular elements
- `splice(start, count of remove elements)` : Remove the particular elements from array
- `join` : join particular element in array
- `some` : It returns true if any element satisfies the condition, otherwise it returns false
- `every` : It returns true only if every element satisfies the condition, otherwise it returns false.
- `foreach` : forEach is used to iterate the array(not modification)
- `map` : map is used to iterate the array(new array), If you want to modify the array then use map
- `filter` : filter particular element in array based on condition
- `reduce` : reduce particular element in array(combine in to one)

## Objects

- A JavaScript object is another variable that allows us to store multiple pieces of data.

```js
var student = {
  name: "Mary",
  age: 10,
};
console.log(student.name);
console.log(student["age"]);
```

## this Keyword

- The this keyword allows us to create functions that modify the specific instance of the object to which the function is attached.

```js
const person = {
  name: "Pratik",
  greet: function () {
    console.log("Hello, my name is " + this.name);
  },
};

person.greet();
```

## DOM (Document Object Model)

- It is a programming interface provided by the browser that allows JavaScript to interact with and manipulate the HTML and CSS of a web page.
- The DOM is like a tree structure that represents all the elements (tags) of your webpage.
- JavaScript can use this structure to read, add, change, or delete elements and content on the page.

```
Document
  └── html
      └── body
          ├── h1
          │   └── "Hello"
          └── p
              └── "Welcome!"
```

- `getElementById` : Returns the element with the ID
- `getElementsByClassName` : Returns an HTMLCollection of class
- `getElementsByTagName` : Returns all HTML elements

- `querySelector` : Returns the first element matching the selector
- `querySelectorAll` : Returns all matching elements as a NodeList

- `createElement` : Create a new HTML elements

- `createTextNode` : Creates a new text node
- `appendChild(newElement)` : Adds a new element to the body
- `removeChild(element)` : Removes an element from the body

### Dom Properties

- `tagName` : returns the tag name of the element
- `className` : returns the class name of the element
- `innerHTML` : returns the palin text or HTML content of the element
- `innerText` : returns the visible text content of the element
- `textContent` -> returns the text content of the element event for hidden elements
- `value` -> returns the value of the element

- `getAttribute` -> returns the value of the attribute
- `setAttribute` -> sets the value of the attribute

- `node.style` -> returns the style object of the element

## Events in js

- Chnage in the state of an object is knoown as an event
- Events are fired to notify code of "interesting changes " that may affect code execuation

### Event Types

1. Mouse Events - click, mousemove, mouseout, mouseover
2. Keyboard Events - keydown, keypress, keyup
3. Focus Events - focus, blur
4. Form Events - submit, change, reset

```js
btn.click = () => {
  console.log("clicked");
};
```

- `Event Object` : it is a special object that has details about the event
- Call envents handlers have acces to the event object's properties and methods

1. target - returns the element that triggered the event
2. preventDefault() - prevents the default behavior of the event
3. stopPropagation() - stops the event from bubbling up the DOM tree

```js
btn.click = (e) => {
  console.log(e.target);
  e.preventDefault();
  e.stopPropagation();
};
```

### Event Listeners

1. `addEventListener` - adds an event listener to an element
2. `removeEventListener` - removes an event listener from an element

```js
btn.addEventListener("click", (e) => {
  console.log(e.target);
});
```

```js
btn.removeEventListener("click", (e) => {
  console.log(e.target);
});
```

## Shallow Copy

- A shallow copy occurs when you copy the reference of an object to a new variable. In this process, only the top-level properties are copied, while nested objects or arrays still reference the original memory location.

```js
let employee = {
  eid: "E102",
  ename: "Jack",
};

console.log("Employee=> ", employee);

// Shallow copy
let newEmployee = { ...employee };
console.log("New Employee=> ", newEmployee);

console.log("---------After modification----------");
newEmployee.ename = "Beck";

console.log("Employee=> ", employee);
console.log("New Employee=> ", newEmployee);
```

- shallow copy also done via this

```js
let user = {
  name: "John",
  age: 30,
};

let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}

// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

console.log(user.name); // still John in the original object
console.log(clone.name);
```

## Deep Copy

- A deep copy, on the other hand, creates a completely independent copy of the object, including all nested objects or arrays. This ensures that changes made to one object do not affect the other. Each object is stored in a separate memory location, making them entirely independent.

- `JSON.stringify()` : converts a JavaScript object into a JSON string.
- `JSON.parse()` : converts the JSON string back into a new JavaScript object.

```js
let employee = {
  eid: "E102",
  ename: "Jack",
};
console.log("=========Deep Copy========");
let newEmployee = JSON.parse(JSON.stringify(employee));

console.log("Employee=> ", employee);
console.log("New Employee=> ", newEmployee);

console.log("---------After modification---------");
newEmployee.ename = "Beck";

console.log("Employee=> ", employee);
console.log("New Employee=> ", newEmployee);
```

## Optinal Chaining

- It is a syntax that allows you to safely access properties, methods, or array elements without manually checking if each reference in the chain is valid.

- Represented by the ?. operator,

## Destructuring

### Rest Oprator

- Rest operator packs multiple elements into a single array or object
- Handles an indefinite number of arguments or remaining properties.

### Spread Oprator

- The Spread operator unpacks elements from an array or object.
- Creates a shallow copy of an array or object.

## JSON (JavaScript Object Notation)

- parse
- stringify

## Recursion

- It is a programming technique where a function calls itself to solve a problem by breaking it down into smaller, simpler sub-problems.

```js
function sum(n) {
  if (n === 0) {
    return 0; // base case
  }
  return n + sum(n - 1); // recursive call
}

console.log(sum(5)); // 15
```

## Scheduling

- `setTimeout()` : Executes a function once after a specified delay in milliseconds.
- `setInterval()` : Repeatedly executes a function at a fixed time interval.

## Error Handling

- `try` : A block containing code that might throw an error.

- `catch(error)` : Executes if an error occurs in the try block, providing an error object with properties like name and message.

- `finally`: An optional block that always runs after the try and catch blocks, regardless of whether an error was thrown.

## Callback

- It is a function which is passed as an argument to another function is called a callback function.

```js
function print() {
  console.log("3 seconds passed");
}

setTimeout(print, 3000);
console.log("Done !");
```

## Callback Hell

- callback hell is a pattern where multiple nested callbacks are used to handle asynchronous operations in a complex application.

```js
function getData(dataId, getNextdata) {
  setTimeout(() => {
    console.log("data = ", dataId);
    if (getNextdata) {
      getNextdata();
    }
  }, 2000);
}

// this is complext call back hell
getData(1, () => {
  console.log("getting data2...");
  getData(2, () => {
    console.log("getting data3...");
    getData(3, () => {
      console.log("getting data4...");
      getData(4);
    });
  });
});
```

## Promise

- Promises is an object that is for eventual completion of asynchronous oprational task

```js
let promise = new Promise((resolve, reject) => {
  resolve();
  reject();
});
```

- Promise has three state of a promise
- `Pending` : the result is undefined
- `Resolved` : the result is a value (fulfilled) `resolve( result )`
- `Rejected` : the result is an error object `reject( error )`

```js
let promise = new Promise((res, rej) => {
  setTimeout(() => {
    console.log("Hello Pratik");
    res("success");
    rej("error");
  }, 2000);
})
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
```

## Prmoise Chaining

```js
function getData(dataId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("data = ", dataId);
      resolve("success");
    }, 2000);
  });
}

let promise = getData(123);

promise
  .then((result) => {
    console.log(result);
    return getData(456);
  })
  .then((result) => {
    console.log(result);
    return getData(789);
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```

## Async Await

- async fucntion always returns a promise
- await pauses the execution of its surrounding async function until the promise is setteled.

```js
function api() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("data ");
      resolve("success");
    }, 5000);
  });
}

async function main() {
  const result = await api();
  console.log(result);
}

console.log(main());
```

## IIFE - Immediately Invoked Function Expression

- It is function that is called immediately after it is defined

```js
(function () {
  console.log("Hello");
})();

(async () => {
  console.log("Hello");
})();
```

## Module

- A module is a self-contained file that groups related code (functions, variables, or classes) to be reused across different parts of an application.

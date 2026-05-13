# TypeScript

- It adds static typing.

- **JavaScript + Type Checking**

```ts
let message: string = "Hello TypeScript!";
console.log(message);
```

- In `javascript` fucntion there is type of variable is any

```js
function add(a, b) {
  return a + b;
}

add(5, "10"); // "510"
```

- But in `typescript` you can assign the type so it must be a number etc..

```ts
function sum(a: number, b: number): number {
  return a + b;
}

console.log(sum(2, 3));
```

## Arrays

```ts
let nums: number[] = [1, 2, 3, 4];

// nums.push(90) // Error

nums.push(90);

console.log(nums); // [1, 2, 3, 4, 90]
```

```ts
let fruits: string[] = ["apple", "banana"]; // String array
```

## Tuple

- A tuple is a typed array with a pre-defined length and types for each index.

```ts
// define our tuple
let ourTuple: [number, boolean, string];

// initialize correctly
ourTuple = [5, false, "Coding God was here"];

//Named tuple
const graph: [x: number, y: number] = [55.2, 41.3];
```

## Objects

```ts
let user: {
  name: string;
  age: number;
} = {
  name: "Pratik",
  age: 21,
};

console.log(user); // { name: 'Pratik', age: 21 }
```

## Functions

```ts
function greet(name: string): string {
  return "Hello " + name;
}
console.log(greet("Pratik")); // Hello Pratik
```

## Optional parameters

- Sometimes parameter may be missing.

```ts
function greet(name?: string): string {
  return "Hello " + (name || "Guest");
}

console.log(greet()); // Hello Guest
console.log(greet("Pratik")); // Hello Pratik
```

## Union Types

- Means variable can have multiple types.

```ts
let id: string | number;

id = "101";
id = 101;
```

## Intersections Types

- type combines multiple types into one,

```ts
let id: string & number;

id = "101";
id = 101;
```

## Type Alias

- Instead of repeating types.
- TypeScript allows types to be defined separately from the variables that use them.
- Type Aliases can be used for primitives like string or more complex types such as objects and arrays

```ts
type User = {
  name: string;
  age: number;
};

let user: User = {
  name: "Pratik",
  age: 21,
};

console.log(user); // { name: 'Pratik', age: 21 }
```

## Interface

- Looks similar to type.
- interface = blueprint for object
- Interfaces let you define a reusable 'shape' for your objects — like a blueprint. This is one of the most important features in TypeScript.
- Interfaces are similar to type aliases, except they only apply to object types.

```ts
interface User {
  name: string;
  age: number;
}

let user: User = {
  name: "Pratik",
  age: 21,
};

console.log(user); // { name: 'Pratik', age: 21 }
```

```ts
interface Animal {
  name: string;
  age: number;
}

// Dog has everything Animal has, PLUS its own properties
interface Dog extends Animal {
  breed: string;
  isVaccinated: boolean;
}

const myDog: Dog = {
  name: "Bruno",
  age: 3,
  breed: "Labrador",
  isVaccinated: true,
};

console.log(myDog); //{ name: 'Bruno', age: 3, breed: 'Labrador', isVaccinated: true }
```

## Literal Types

- Specific exact values.
- Useful for strict options.

```ts
let direction: "left" | "right";
direction = "left";

console.log(direction);
```

## Unknown

- Safer than any.
- This forces safer code.

```ts
let value: unknown = "hello";

if (typeof value === "string") {
  console.log(value.toUpperCase()); // HELLO
}
```

## Enums

- It allow you to define a set of named constants
- Enums come in two flavors `string` and `numeric`.

```ts
enum Role {
  Admin,
  User,
  Guest,
}

let myRole: Role = Role.User;

console.log(myRole);
```

## Classes

- Since JS has classes, TS adds typing.

```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  greet(): void {
    console.log("Hello " + this.name);
  }
}

const user = new Person("Pratik");
user.greet();
```

## Generics

- Generics are like type variables — they let you write code that works with any type while still being fully type-safe.
- `<T>` : T is a "type variable" — it gets replaced when called

- `T means`: “whatever type comes in should go out.”

```ts
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("Pratik"));
console.log(identity<number>(21));
```

## Record

- Record is a shortcut to defining an object type with a specific key type and value type.

```ts
const nameAgeMap: Record<string, number> = {
  Alice: 21,
  Bob: 25,
};

console.log(nameAgeMap);
```

## keyof 
- It is a keyword in TypeScript which is used to extract the key type from an object type.
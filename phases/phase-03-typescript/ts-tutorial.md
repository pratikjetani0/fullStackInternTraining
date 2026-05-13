# 🚀 TypeScript

## 📌 1. Basic Function

- A simple function with typed parameters and return type.

```ts
function add(a: number, b: number): number {
  console.log("Adding two numbers");
  return a + b;
}

console.log(add(1, 2));
```

---

## 🔍 2. Type Assertions

- Used when you know more about a value’s type than TypeScript does.
- If the types don't match, the code will throw an error
- That's why it importance to know type of data we are working with

```ts
let response: any = "235432";

let numericLength: number = (response as string).length;
```

### 📦 Example with Object

```ts
type Book = {
  name: string;
  price: number;
};

let bookString = '{"name": "My Book", "price": 10}';

let bookObject = JSON.parse(bookString) as Book;

console.log(bookObject.name);
```

```ts
const input = document.getElementById("input-id") as HTMLInputElement; // this is the new way to typecast
```

---

## ⚖️ 3. `any` vs `unknown`

- `any` → disables type checking ❌
- `unknown` → safer alternative ✅

```ts
let value: any;
value = "hello";
value.toUpperCase(); // ✅ no error

let newValue: unknown;
newValue = "hello";
// newValue.toUpperCase(); ❌ error
```

---

## 🛑 4. Try-Catch Error Handling

- Always check error type before accessing properties.

```ts
try {
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
  console.log("error", error);
}
```

---

## 🚫 5. Never Type

- Used when something never happens (exhaustive checks).

```ts
type Role = "admin" | "user" | "super-admin";

function getRole(role: Role): void {
  if (role === "admin") {
    console.log("admin dashboard");
    return;
  }

  if (role === "user") {
    console.log("user dashboard");
    return;
  }

  role; // never case
}
```

---

## 🧾 6. Type Aliases

- Reusable custom types for cleaner code.

```ts
type Chai = {
  type: string;
  sugar: number;
  milk?: string;
};

function makeChai(order: Chai) {
  console.log(order);
}
```

```ts
// THIS IS NOT READBLE CODE
function makeChai(order: { type: string; sugar: number; milk?: string }) {
  console.log(order);
}
```

---

## 🧩 7. Interfaces

- Best used with classes and object structures.

```ts
interface CupSize {
  size: "small" | "medium" | "large";
}

class Chai implements CupSize {
  size: "small" | "medium" | "large" = "medium";
}
```

---

## 🔒 8. Readonly Properties

- Values that cannot be changed after initialization.

```ts
type Config = {
  readonly appName: string;
  version: number;
};

const config: Config = {
  appName: "My App",
  version: 1.0,
};

// config.appName = "New App" ❌ Error
```

---

## 🧱 9. Object Typing

```ts
const user: { name: string; age: number } = {
  name: "John",
  age: 30,
};
```

---

## 🔄 10. Utility Types

### 🔹 Partial

- Used to make optional properties

```ts
type User = {
  name: string;
  age: number;
};

const updateUser = (update: Partial<User>) => {
  console.log(update);
};
```

### 🔹 Required

- If we do in type optional but make the requried properties

```ts
type User = {
  name?: string;
  age?: number;
};

const updateUser = (update: Required<User>) => {};
```

### 🔹 Pick & Omit

- `Pick` → select properties
- `Omit` → remove properties

---

## 🔢 11. Arrays

```ts
const arr: number[] = [1, 2, 3];
const arr2: Array<number> = [1, 2, 3];
```

---

## 📦 12. Tuples

- It is fixed length array of differnt types

```ts
const tuple: [number, string, boolean] = [1, "hello", true];
```

---

## 🏷️ 13. Enums

- It is a set if named constants
- Do not use hetrogenous values

```ts
enum Role {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}
```

---

## 🧑‍💻 14. OOP (Classes)

```ts
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

---

## 🔐 15. Getter & Setter

```ts
class User {
  private _balance: number = 0;

  get balance() {
    return this._balance;
  }

  set balance(value: number) {
    this._balance = value;
  }
}
```

---

## 🧬 16. Generics

- Reusable type-safe components.

```ts
function wrapInArray<T>(value: T): T[] {
  return [value];
}
```

### Interface Example

```ts
interface Box<T> {
  value: T;
}

const box: Box<string> = {
  value: "hello",
};
```

---

## 🌐 17. API Calls (Fetch)

```ts
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1",
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data, status: ${response.status}`);
    }

    const data: Todo = await response.json();
    console.log(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    console.log("error", error);
  }
};
```

---

## ⚡ 18. API Calls (Axios)

```ts
import axios, { AxiosResponse } from "axios";

const fetchData = async () => {
  try {
    const response: AxiosResponse<Todo> = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1",
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
```
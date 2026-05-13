// Write a generic fetchData<T> function, a groupBy<T> helper, and a typed useState-like hook. Generics are the single biggest leap in TS

//! Generics

// A generic is a type placeholder. Instead of writing a function that only works with User[], you write it once with T[] — and TypeScript fills in the real type each time you call it. Same logic, infinite reuse, full type safety.

// without generics — you write this 3 times for User, Product
// function firstUser(arr: User[]): User { return arr[0]; }
// function firstProduct(arr: Product[]): Product { return arr[0]; }

// with generics — write once, works for everything
// function first<T>(arr: T[]): T { return arr[0]; }

// const u = first(users);     // T = User  ← TS infers it
// const p = first(products);  // T = Product ← TS infers it

//! 1. Challenge
// A typed fetch wrapper. Call it with fetchData<User>("/api/users") and get back a Promise<User> — not Promise<any>. T must be constrained to objects only (no primitives).

interface User {
    id: number
    username : string
    email : string
    firstName : string
    lastName : string
    gender: string
}

async function fetchData<T extends object>(url:string) : Promise<T> {
    const response = await fetch(url)
    const data = await response.json()

    return data as T
}

async function main(){
const data = await fetchData<User>('https://dummyjson.com/users/1');

// destructuring
const user: User = {
    id: data.id,
    username: data.username,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender
  };

  console.log(user);

}

main()

//! 2. Challenge
// Groups an array by a field name. Call groupBy(products, "category") and get back { electronics: Product[], clothing: Product[] }. K must be constrained to actual keys of T, and the value at T[K] must be a string.

function groupBy<T extends object, K extends keyof T>(
  arr: T[],
  key: K,
): Record<string, T[]> {
  return arr.reduce(function(groups, item) {
    const groupKey = item[key] as string;
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

type Product = { name: string; category: string; price: number };

const products: Product[] = [
  { name: "Phone",  category: "electronics", price: 699 },
  { name: "Laptop", category: "electronics", price: 1299 },
  { name: "Shirt",  category: "clothing",     price: 29 },
];

const grouped = groupBy(products, "category");

console.log(grouped);

//! 3. Challenge
// A safe property accessor. Call getProperty(user, "name") and get back the value with the correct type inferred automatically. Writing getProperty(user, "age") should cause a TS error if "age" doesn't exist on User.

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}


const user = {
    id:2,
  name: "Pratik"
};

const name = getProperty(user, "name"); // should be string
const id = getProperty(user, "id"); // should be number

// getProperty(user, "age")  

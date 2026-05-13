# React

## React Basics & JSX

### What is React?

React is an **external library** that helps us create websites more easily. Two key ideas:

- **External library** — code written by someone else, loaded onto our website
- **Helps create websites easier** — provides tools to build, organise, and update UI

### External Libraries & the Script Element

We load JavaScript onto a page using the `<script>` element:

```html
<!-- Pattern 1: Inline Script -->
<script>
  console.log("hello");
</script>
```

> **Note:** React is split into two packages: `react` (shared) and `react-dom` (web-specific).

### What is JSX?

JSX (JavaScript XML) is an enhanced version of JavaScript that lets us write HTML directly inside JavaScript code.

```js
// Normal JavaScript (verbose)
const btn = document.createElement("button");
btn.textContent = "Hello";

// JSX (simple)
const btn = <button>Hello</button>;
```

JSX is **not** understood by browsers directly. We use **Babel** to translate JSX into normal JavaScript.

| Feature          | Details                                                             |
| ---------------- | ------------------------------------------------------------------- |
| Babel            | JavaScript compiler that translates JSX to plain JS                 |
| `type` attribute | Add `type="text/babel"` on your `<script>` tag to trigger Babel     |
| Closing tags     | In JSX ALL elements need a closing tag or self-closing: `<input />` |

### Rendering Elements

```jsx
const container = document.querySelector(".js-container");
const root = ReactDOM.createRoot(container);

// Render text
root.render("Welcome!");

// Render a single element
const btn = <button>Click me</button>;
root.render(btn);

// Render multiple elements — group in a div
const app = (
  <div>
    <button>Send</button>
    <p>Paragraph of text</p>
  </div>
);
root.render(app);
```

### Fragments

A **Fragment** groups elements without adding an extra DOM node.

```jsx
// Fragment syntax — no extra <div> in the DOM
const app = (
  <>
    <button>Send</button>
    <p>Paragraph of text</p>
  </>
);
```

### Inserting JavaScript Values into JSX

Use curly braces `{}` to embed any JavaScript expression inside JSX:

```jsx
const name = "Alice";
const element = (
  <p>
    Hello, {name}! 2 + 2 = {2 + 2}
  </p>
);
// Renders: Hello, Alice! 2 + 2 = 4
```

---

## Components & Props

### What is a Component?

A **component** is a reusable, self-contained unit of UI. Examples from the Chatbot project:

- `ChatInput` — the text box and Send button
- `ChatMessage` — a single chat message bubble with profile image
- `App` — the entire application (outermost component)

### Creating a Component

A React component is just a **function that returns JSX**. The function name **MUST** start with a capital letter (PascalCase).

```jsx
// ChatInput component
function ChatInput() {
  return (
    <div>
      <input placeholder="Send a message..." size="30" />
      <button>Send</button>
    </div>
  );
}
```

### Component Syntax

```jsx
// Function call syntax (not recommended)
root.render(ChatInput());

// Component syntax (recommended — creates a custom HTML element)
root.render(<ChatInput />);
```

### What are Props?

**Props** (properties) allow us to pass data into a component — just like HTML attributes.

```jsx
// Usage (like HTML attributes)
<ChatMessage message="Hello chatbot!" sender="user" />;

// Inside the component
function ChatMessage(props) {
  const message = props.message; // "Hello chatbot!"
  const sender = props.sender; // "user"
  return <div>{message}</div>;
}
```

### Destructuring Props (Shortcut)

```jsx
// Destructuring in the parameter (most common pattern)
function ChatMessage({ message, sender }) {
  return <div>{message}</div>;
}
```

### Generating Lists with `.map()`

```jsx
const chatMessages = [
  { id: "id1", message: "Hello chatbot!", sender: "user" },
  { id: "id2", message: "Hello! How can I help?", sender: "robot" },
];

// Generate components from data
const components = chatMessages.map((msg) => (
  <ChatMessage key={msg.id} message={msg.message} sender={msg.sender} />
));
```

> **Rule:** When rendering a list of components, each must have a unique `key` prop. This helps React track changes efficiently.

### Conditional Rendering — Guard Operator (`&&`)

```jsx
// Show robot image only if sender is 'robot'
{
  sender === "robot" && <img src="robot.png" width="45" />;
}

// Show user image only if sender is 'user'
{
  sender === "user" && <img src="user.png" width="45" />;
}
```

## Chapter State & Event Handlers

### Event Handlers

An **event handler** is a function that runs when the user interacts with the page. React uses camelCase event props:

```jsx
function handleClick() {
  console.log("Button clicked!");
}

// Pass the function — do NOT call it with ()
<button onClick={handleClick}>Click me</button>

// Inline arrow function
<button onClick={() => console.log("clicked!")}>Click</button>
```

| Event Prop     | Fires When           |
| -------------- | -------------------- |
| `onClick`      | Element is clicked   |
| `onChange`     | Input value changes  |
| `onSubmit`     | Form is submitted    |
| `onMouseEnter` | Mouse enters element |
| `onKeyDown`    | Key is pressed       |

### Getting Input Text with `onChange`

```jsx
function saveInputText(event) {
  // event.target is the <input> element
  // event.target.value is the current text inside it
  console.log(event.target.value);
}

<input onChange={saveInputText} />;
```

### What is State?

**State** is data that is connected to the HTML. When you update state, React automatically updates the UI.

- Normal variable changed → UI does **NOT** update
- State updated via updater function → UI **DOES** update automatically

### `useState` Hook

```jsx
import { useState } from "react";

// Declare state with an initial value
const [chatMessages, setChatMessages] = useState([
  { id: "id1", message: "Hello!", sender: "user" },
]);

// Read  → use chatMessages
// Write → call setChatMessages(newArray)
```

`useState` returns an array with exactly two values:

- **Index 0** — the current state value
- **Index 1** — the updater function (naming convention: `set` + StateName)

### Updating State (Spread Operator Pattern)

> **Never mutate state directly. Always create a new copy.**

```jsx
// Add a new chat message
function sendMessage() {
  const newMessages = [
    ...chatMessages, // copy existing messages
    {
      id: crypto.randomUUID(),
      message: inputText,
      sender: "user",
    },
  ];
  setChatMessages(newMessages); // triggers re-render
}
```

### Controlled Inputs

A **controlled input** means React drives the value of the `<input>` element.

```jsx
const [inputText, setInputText] = useState("");

<input value={inputText} onChange={(e) => setInputText(e.target.value)} />;

// Clear after send
setInputText(""); // next render empties the input
```

### Lifting State Up

When two sibling components need to share the same state, move the state to their **closest common ancestor** and pass it down via props.

```jsx
// App — parent holds shared state
function App() {
  const [cart, setCart] = useState([]);
  return (
    <>
      <ProductList cart={cart} setCart={setCart} />
      <CartSummary cart={cart} />
    </>
  );
}
```

> **Pattern:** Lifting state up is a fundamental React pattern. Move state to the highest component that needs it, then pass it down as props.

---

## React Hook (useEffect & useRef)

### `useEffect` Hook

`useEffect` lets you run code **after a component is created or updated**.

```jsx
import { useEffect } from "react";

// Runs ONCE after component is created
useEffect(() => {
  console.log("Component mounted!");
}, []); // empty array = run once

// Runs every time chatMessages changes
useEffect(() => {
  // auto-scroll to bottom
  if (containerEl) containerEl.scrollTop = containerEl.scrollHeight;
}, [chatMessages]); // dependency array
```

> **Rule:** Do not put hooks inside `if` statements or loops. Hooks must always be called at the top level of a component function.

### `useRef` Hook

`useRef` stores a reference to a DOM element, giving you direct access without using the DOM manually.

---

## Routing with React Router

### What is Routing?

Routing lets you create **multiple pages** in a React app, each mapped to a URL path, all inside **ONE HTML file** (a Single Page Application — SPA).

- **Without routing:** Navigating between pages requires reloading the entire page
- **With routing:** React swaps components instantly using JavaScript — no reload

### Installing React Router

```bash
npm install react-router-dom
```

### Basic Router Setup

```jsx
// main.jsx
import { BrowserRouter } from "react-router-dom";
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// App.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="orders" element={<Orders />} />
    </Routes>
  );
}
```

### 7.4 Route Props Reference

| Prop                      | Meaning                          |
| ------------------------- | -------------------------------- |
| `index`                   | Matches the root path `/`        |
| `path='/checkout'`        | Matches the URL path `/checkout` |
| `element={<Component />}` | Component to render at this path |

### 7.5 The `Link` Component

```jsx
// ❌ Causes full page reload
<a href="/orders">Orders</a>;

// ✅ Fast client-side navigation
import { Link } from "react-router";
<Link to="/orders">Orders</Link>;
```

### `useNavigate` Hook

```jsx
import { useNavigate } from "react-router-dom";

function PaymentSummary() {
  const navigate = useNavigate();

  async function createOrder() {
    await axios.post("/api/orders");
    navigate("/orders"); // redirect after order is placed
  }
}
```

## Backend Integration & Data Fetching

### What is a Backend?

A backend is another computer (server) that manages all the data. Reasons to use a backend:

- Too much data to store on every visitor's device
- Data needs to be shared across many devices
- Calculations and business logic should live server-side

### Data Fetching — fetch API

```js
fetch("/api/products")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

### Axios — Cleaner HTTP Requests

```bash
npm install axios
```

```js
import axios from "axios";

// GET request
const response = await axios.get("/api/products");
console.log(response.data); // the products array
```

### Async/Await with `useEffect`

> **Rule:** Never make the `useEffect` callback itself async. Create an inner async function and call it instead.

```jsx
import { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    }
    fetchData(); // call the inner async function
  }, []); // run once on mount

  return products.map((p) => <Product key={p.id} product={p} />);
}
```

## Data Mutation

### HTTP Request Types

| Method   | Purpose              |
| -------- | -------------------- |
| `GET`    | Read / fetch data    |
| `POST`   | Create new data      |
| `PUT`    | Update existing data |
| `DELETE` | Delete data          |

### Add to Cart (POST Request)

```js
async function addToCart() {
  await axios.post("/api/cart-items", {
    productId: product.id,
    quantity: quantity,
  });
  await loadCart(); // reload cart to update UI
}
```

### Update Delivery Option (PUT Request)

```js
async function updateDeliveryOption() {
  await axios.put(`/api/cart-items/${cartItem.productId}`, {
    deliveryOptionId: deliveryOption.id,
  });
  await loadCart();
}
```

> **Convention:** When updating or deleting, the ID is typically placed in the URL path: `/api/cart-items/:productId`.

### Delete Cart Item (DELETE Request)

```js
async function deleteCartItem() {
  await axios.delete(`/api/cart-items/${cartItem.productId}`);
  await loadCart();
}
```

### Create Order (POST + Navigate)

```jsx
import { useNavigate } from "react-router";

function PaymentSummary({ loadCart }) {
  const navigate = useNavigate();

  async function createOrder() {
    await axios.post("/api/orders");
    await loadCart(); // cart is now empty
    navigate("/orders"); // redirect to orders page
  }

  return <button onClick={createOrder}>Place Order</button>;
}
```

### Dependency Array & Derived Updates

```jsx
// Re-fetch payment summary whenever the cart changes
useEffect(() => {
  async function fetchCheckoutData() {
    const res = await axios.get("/api/payment-summary");
    setPaymentSummary(res.data);
  }
  fetchCheckoutData();
}, [cart]); // ← reruns when cart changes
```

---

## Chapter 10: Automated Testing with Vitest

### 10.1 Why Automated Tests?

- Faster than manually clicking around after every change
- Catch regressions (bugs you accidentally introduce)
- Document expected behaviour

### 10.2 Installing Vitest

```bash
npm install --save-dev vitest@<version> @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

### 10.3 Test Types

| Test Type        | What It Tests                                       |
| ---------------- | --------------------------------------------------- |
| Unit test        | A single function in isolation (e.g. `formatMoney`) |
| Integration test | Multiple pieces working together (e.g. a component) |

### 10.4 Writing Unit Tests

```js
// utils/money.test.js
import { describe, it, expect } from "vitest";
import { formatMoney } from "./money";

describe("formatMoney", () => {
  it("formats 1999 cents as $19.99", () => {
    expect(formatMoney(1999)).toBe("$19.99");
  });

  it("shows two decimal places for round amounts", () => {
    expect(formatMoney(1090)).toBe("$10.90");
    expect(formatMoney(100)).toBe("$1.00");
  });
});
```

### 10.5 Writing Integration Tests

```jsx
// pages/home/Product.test.jsx
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Product } from "./Product";

const sampleProduct = {
  id: "p1",
  name: "Black Dress Socks",
  image: "socks.jpg",
  priceCents: 1090,
  rating: { stars: 4.5, count: 87 },
};

describe("Product component", () => {
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn(); // fresh mock before each test
  });

  it("displays product details correctly", () => {
    render(<Product product={sampleProduct} loadCart={loadCart} />);
    expect(screen.getByText("Black Dress Socks")).toBeInTheDocument();
    expect(screen.getByText("$10.90")).toBeInTheDocument();
  });
});
```

### 10.6 Mocking

```js
// Mock entire axios package
vi.mock("axios");
import axios from "axios"; // now a fake

// Mock a function
const loadCart = vi.fn(); // does nothing by default

// Mock implementation (make it do something specific)
axios.get.mockImplementation(async (url) => {
  if (url === "/api/products") return { data: [sampleProduct] };
});
```

### 10.7 Testing User Interactions

```jsx
import userEvent from "@testing-library/user-event";

it("adds a product to the cart", async () => {
  const user = userEvent.setup();
  render(<Product product={sampleProduct} loadCart={loadCart} />);

  await user.click(screen.getByTestId("add-to-cart-button"));

  expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
    productId: "p1",
    quantity: 1,
  });
  expect(loadCart).toHaveBeenCalled();
});
```

### 10.8 Running Tests

```bash
# Run all tests once
npx vitest run

# Watch mode (re-runs on file save)
npx vitest
```

### 10.9 Key Lessons Recap

- Use Vitest for automated testing in Vite projects
- `it()` creates a test; `expect()` checks the result; `describe()` groups related tests
- `beforeEach()` runs setup code before every test in a suite
- `vi.fn()` creates a mock function; `vi.mock()` mocks an entire module
- Use `@testing-library/react` render + screen to test components
- Use `@testing-library/user-event` to simulate real user actions

---

## Chapter 11: Deploying with AWS

### 11.1 AWS Overview

| Service                     | What It Does                                      |
| --------------------------- | ------------------------------------------------- |
| EC2 (Elastic Compute Cloud) | Rent a virtual computer (IaaS)                    |
| Elastic Beanstalk           | Manages EC2 + software setup automatically (PaaS) |
| Route 53                    | Domain name management and DNS                    |
| Certificate Manager         | Free SSL/TLS certificates                         |

### 11.2 Build for Production

```bash
npm run build   # creates the dist/ folder
```

Configure Vite to output the `dist` folder into the backend:

```js
// vite.config.js
build: {
  outDir: "../ecommerce-backend/dist";
}
```

### 11.3 Deploying the Backend to Elastic Beanstalk

1. Create an Elastic Beanstalk environment (Node.js platform)
2. Run `npm run zip` in the backend folder to create a zip file
3. In Elastic Beanstalk → **Upload and Deploy** → upload the zip
4. Visit the provided URL to verify the backend is live

### 11.4 Deploying the Frontend

1. Run `npm run build` in the frontend project (outputs to `backend/dist`)
2. Run `npm run zip` in the backend folder again
3. Upload the new zip to Elastic Beanstalk
4. Visit the URL — React app should load

> **How it works:** The backend serves the React files from the `dist/` folder. The user's browser downloads the React code, which then communicates with the backend API.

### 11.5 Production Architecture

A production-ready setup includes:

- **Load Balancer** — distributes traffic across multiple backend instances
- **Multiple EC2 instances** — handle high traffic
- **Separate Database** (e.g. RDS / MySQL) — shared between all backend instances
- **Custom Domain** (Route 53) — e.g. `mysite.com`
- **SSL Certificate** (Certificate Manager) — enables HTTPS encryption

### 11.6 Deploying without a Backend

If your React app has no backend, build it with `npm run build` and upload the `dist/` folder to any static hosting service (e.g. GitHub Pages, Netlify, Vercel).

### 11.7 Key Lessons Recap

- `npm run build` creates an optimised production bundle in `dist/`
- Elastic Beanstalk automates server setup — just upload a zip
- Put the React `dist/` folder inside the backend to serve both from one server
- A production setup includes a load balancer, database, domain, and HTTPS

---

## Chapter 12: TypeScript with React & AI

### 12.1 React 19 Key Updates

| Update               | What Changed                                                                  |
| -------------------- | ----------------------------------------------------------------------------- |
| Document metadata    | Place `<title>`, `<link>`, `<meta>` directly in components — no extra package |
| ref as a prop        | Refs are now normal props — no need for `forwardRef`                          |
| React Compiler       | Automatically optimises components — replaces `useMemo`/`useCallback`/`memo`  |
| Removed prop-types   | Deprecated in favour of TypeScript                                            |
| Removed defaultProps | Use JavaScript default parameter values instead                               |

### 12.2 React Compiler Setup

```bash
npm install babel-plugin-react-compiler@<version>
```

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
});
```

### 12.3 What is TypeScript?

TypeScript is JavaScript with **type annotations**. It adds:

- **Type checking** — catches type errors before runtime
- **Type inference** — automatically figures out types from context
- **Better autocomplete** — your editor knows what methods are available

```ts
// JavaScript
let count = 0;
count.toLowerCase(); // ← crashes at runtime with no warning

// TypeScript
let count: number = 0;
count.toLowerCase(); // ← error highlighted immediately in editor
```

### 12.4 Create a TypeScript React Project

```bash
npx create-vite@<version>
# Choose: React → TypeScript
# Files use .tsx instead of .jsx
# TypeScript config: tsconfig.json, tsconfig.app.json
```

### 12.5 TypeScript Basics

```ts
// Primitive types
const name: string = "Alice";
const age: number = 30;
const active: boolean = true;

// Arrays
const ids: string[] = ["id1", "id2"];
const scores: number[] = [95, 87];

// Objects
const user: { name: string; age: number } = { name: "Alice", age: 30 };

// Type alias (reusable type)
type User = { name: string; age: number };
const user: User = { name: "Bob", age: 25 };
```

### 12.6 Typing Props in React

```tsx
// Define the shape of props with a type alias
type ChatMessageProps = {
  message: string;
  sender: "user" | "robot";
};

// Use the type on the parameter
function ChatMessage({ message, sender }: ChatMessageProps) {
  return <div>{message}</div>;
}

// TypeScript now validates usage
<ChatMessage message="Hello" sender="user" />  // ✅ OK
<ChatMessage message={42} sender="user" />     // ❌ Error: number not string
```

### 12.7 TypeScript with `useState`

```ts
// TypeScript infers the type from the initial value
const [count, setCount] = useState(0); // number
const [name, setName] = useState(""); // string

// Provide explicit type when inference isn't enough
const [products, setProducts] = useState<Product[]>([]);
const [user, setUser] = useState<User | null>(null);
```

### 12.8 Migrating a JS Project to TypeScript

1. Create a new Vite TypeScript project
2. Add `allowJs: true` to `tsconfig.app.json` — lets `.js` and `.tsx` coexist
3. Rename files one by one from `.jsx` to `.tsx` as you add types
4. Fix TypeScript errors gradually

```json
// tsconfig.app.json — allow JS files during migration
{
  "compilerOptions": {
    "allowJs": true
  }
}
```

### 12.9 AI-Assisted Development (GitHub Copilot)

1. Install the **GitHub Copilot** extension in VS Code
2. Sign in with your GitHub account
3. Start typing — Copilot suggests completions; press **Tab** to accept
4. Use the Copilot chat panel (agent/edit mode) for natural language instructions

> **Best Practice:** AI accelerates coding but does not replace understanding. You still need to review, test, and modify AI-generated code. Learn the fundamentals first, then use AI as a productivity multiplier.

### 12.10 Key Lessons Recap

- React 19 adds document metadata support, simplifies refs, and introduces the React Compiler
- TypeScript is JavaScript + types — it catches errors before runtime
- Type aliases (`type Foo = {...}`) keep prop type definitions clean and reusable
- Add `allowJs: true` to `tsconfig.app.json` to migrate gradually
- GitHub Copilot provides AI-powered autocomplete and chat inside VS Code

---

## Appendix: Quick Reference

### A. React Hooks Summary

| Hook                  | Purpose                                          |
| --------------------- | ------------------------------------------------ |
| `useState(initial)`   | Reactive state — re-renders on update            |
| `useEffect(fn, deps)` | Side effects — runs after render/update          |
| `useRef(initial)`     | DOM reference or mutable value without re-render |
| `useNavigate()`       | Programmatic navigation (React Router)           |

### B. JSX Rules

- Every element needs a closing tag or self-close: `<input />` not `<input>`
- Use `className` instead of `class`
- Use `htmlFor` instead of `for` (on `<label>`)
- Use curly braces `{}` to embed JavaScript expressions
- A component must return exactly one root element (or a Fragment)
- Component names must start with a capital letter

### C. Common npm Commands

```bash
npm install               # install all packages from package.json
npm install <pkg>         # install a new package
npm install --save-dev <pkg>  # install as dev dependency
npm run dev               # start Vite dev server
npm run build             # production build
npm run test              # run tests (or: npx vitest)
npx create-vite@<ver>     # scaffold a new Vite project
```

### D. Project Quick-Start Checklist

```
1. npx create-vite@<version> → React → JavaScript/TypeScript
2. cd <project> && npm install
3. npm run dev — open localhost:5173
4. Create components in src/components/ (one per file)
5. Create pages in src/pages/ (one per route)
6. Add routes in App.jsx using Routes + Route
7. Use axios for API calls inside useEffect
8. npm run build before deploying
```

---

_End of React Full Course Reference Document_

# 🧠 Task Manager (TypeScript + Tailwind CSS)

A simple yet powerful **Task Manager / Kanban Board** built using **TypeScript, Tailwind CSS, and Vanilla JavaScript (DOM)**.

---

## 🚀 Features

- ✅ Add Task
- ✏️ Edit Task
- 🗑️ Delete Task
- 📊 Kanban Board (Todo / In Progress / Done)
- 💾 LocalStorage Persistence
- 🔔 Toast Notifications
- 🎨 Styled with Tailwind CSS

---

## 🧱 Tech Stack

- **TypeScript** → Type safety & structure
- **Tailwind CSS** → Styling
- **Vanilla JS (DOM API)** → UI rendering
- **LocalStorage** → Data persistence

---

## 📁 Project Structure

```
src/
│
├── ui/
│   ├── board.ts     // Kanban board (modularized)
│   ├── form.ts      // Form handling (basic structure)
│   └── Toast.ts     // Toast notification system
│
├── utils/
│   └── storage.ts   // localStorage helpers
│
├── types/
│   └── index.ts     // Type definitions & enums
│
└── app.ts           // Main application logic
```

---

## 🧠 Core Concepts Used

### 1. State Management (Without Framework)

All tasks are stored in a simple array:

```ts
const tasks: Task[] = loadTasks();
```

This acts as the **single source of truth**.

---

### 2. LocalStorage Integration

```ts
saveTasks(tasks);
```

- Saves tasks on every update
- Loads tasks on page refresh

---

### 3. Modular UI Rendering

The **board is modularized** into smaller functions:

- `createBoard()`
- `createColumn()`
- `createTaskCard()`

👉 This improves:

- readability
- reusability
- maintainability

---

### 4. Toast Notification System

Reusable class-based system:

```ts
const toast = new Toast();
toast.show("Task added successfully ✅", "success");
```

Supports:

- success
- error
- info
- warning

---

## 🎯 How It Works

### ➕ Add Task

- Opens side modal
- Creates new task
- Saves to localStorage
- Updates UI

---

### ✏️ Edit Task

- Prefills form
- Updates existing task
- Re-renders board

---

### 🗑️ Delete Task

- Removes task from array
- Updates storage
- Shows toast

---

### 📊 Kanban Board

Tasks are grouped based on status:

- Todo
- In Progress
- Done

---

## 🖥️ UI Overview

- Dark theme 🌙
- Right-side sliding form
- Card-based task layout
- Priority color indicators

---

## 🔧 Setup Instructions

```bash
# install dependencies
npm install

# For tailwind run
npx tailwindcss -i ./src/style.css -o ./dist/output.css --watch

# run terminal
npm run dev

# run project (live server recommended)
```

## 💡 Learning Outcomes

This project demonstrates:

- Building UI without frameworks
- Managing state manually
- Structuring scalable TypeScript apps
- DOM manipulation best practices
- Clean code separation

---

## 👨‍💻 Author

**Pratik Jetani**
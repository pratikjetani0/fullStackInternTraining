import toast from "./utils/ToastNotification.js";

type Priority = "low" | "medium" | "high"; // UNION type (type alias)
type Category = "study" | "work" | "personal";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  completed: boolean;
}

// empty array for storeing of task
let tasks: Task[] = [];

// Here we do typecating by doing (as HTML...)
const taskTitle = document.getElementById("taskTitle") as HTMLInputElement;
const taskDescription = document.getElementById(
  "taskDescription",
) as HTMLTextAreaElement;
const taskPriority = document.getElementById(
  "taskPriority",
) as HTMLSelectElement;
const taskCategory = document.getElementById(
  "taskCategory",
) as HTMLSelectElement;
const addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;

const taskList = document.getElementById("taskList") as HTMLUListElement;

const totalTasks = document.getElementById("totalTasks") as HTMLSpanElement;
const completedTasks = document.getElementById(
  "completedTasks",
) as HTMLSpanElement;
const pendingTasks = document.getElementById("pendingTasks") as HTMLSpanElement;

// add task
function addTask(): void {
  if (taskTitle.value.trim() === "") {
    toast.show("Please add title", "warning");
    return;
  }

  if (taskDescription.value.trim() === "") {
    toast.show("Please add description", "warning");
    return;
  }

  const newTask: Task = {
    id: Date.now(),
    title: taskTitle.value,
    description: taskDescription.value,
    priority: taskPriority.value as Priority, //cast a custom type
    category: taskCategory.value as Category, // cast a custom type
    completed: false,
  };

  tasks.push(newTask);

  renderTask();
  updateStats();

  taskTitle.value = "";
  taskDescription.value = "";

  toast.show("✅task added successfully", "success");
  console.log(tasks);
}

// render task in UI
function renderTask(): void {
  taskList.innerHTML = ""; // by doing this we do re-rendering

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    li.innerHTML = `
        <h3> ${task.title} </h3>
        <p> ${task.description} </p>
        <p> Priority: ${task.priority} </p>
        <p> Category: ${task.category} </p>
        <p> Status : ${task.completed ? "Completed" : "Pending"} </p>

        <button class="complete-btn">
            ${task.completed ? "Undo" : "Complete"}
        </button>
        <button class="delete-btn" data-id="${task.id}">Delete</button>
    
    `;

    taskList.appendChild(li);

    const completeBtn = li.querySelector(".complete-btn") as HTMLButtonElement;
    const deleteBtn = li.querySelector(".delete-btn") as HTMLButtonElement;

    completeBtn.addEventListener("click", () => {
      toggleTask(task.id);
    });

    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });
  });
}

// delete the task
function deleteTask(id: number): void {
  tasks = tasks.filter((task) => task.id !== id);

  renderTask();
  updateStats();

  toast.show("✅ task deleted", "success");
}

// Toggle the complete or pending
function toggleTask(id: number): void {
  tasks.forEach((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
  });

  renderTask();
  updateStats();

  toast.show("✅Task Updated", "success");
}

// Update stats of task like total task:3, pending:1, completed:2
function updateStats(): void {
  const total = tasks.length;

  const completed = tasks.filter((task) => task.completed).length;

  const pending = total - completed;

  totalTasks.textContent = total.toString();
  completedTasks.textContent = completed.toString();
  pendingTasks.textContent = pending.toString();
}

// Toast message
// function showToast(msg: string): void {
//   const toast = document.createElement("div");
//   toast.innerText = msg;
//   toast.className = "toast";
//   document.body.appendChild(toast);

//   setTimeout(() => toast.classList.add("show"), 10);

//   setTimeout(() => toast.remove(), 2500);
// }

addTaskBtn.addEventListener("click", addTask);

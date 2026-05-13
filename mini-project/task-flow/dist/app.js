import toast from "./utils/ToastNotification.js";
// empty array for storeing of task
let tasks = [];
// Here we do typecating by doing (as HTML...)
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskPriority = document.getElementById("taskPriority");
const taskCategory = document.getElementById("taskCategory");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
// add task
function addTask() {
    if (taskTitle.value.trim() === "") {
        toast.show("Please add title", "warning");
        return;
    }
    if (taskDescription.value.trim() === "") {
        toast.show("Please add description", "warning");
        return;
    }
    const newTask = {
        id: Date.now(),
        title: taskTitle.value,
        description: taskDescription.value,
        priority: taskPriority.value, //cast a custom type
        category: taskCategory.value, // cast a custom type
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
function renderTask() {
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
        const completeBtn = li.querySelector(".complete-btn");
        const deleteBtn = li.querySelector(".delete-btn");
        completeBtn.addEventListener("click", () => {
            toggleTask(task.id);
        });
        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
        });
    });
}
// delete the task
function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    renderTask();
    updateStats();
    toast.show("✅ task deleted", "success");
}
// Toggle the complete or pending
function toggleTask(id) {
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
function updateStats() {
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
//# sourceMappingURL=app.js.map
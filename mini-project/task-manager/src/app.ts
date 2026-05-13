import { renderForm } from "./ui/form.js";
import { renderBoard } from "./ui/board.js";
import type { Task } from "./types/index.js";
import { Toast } from "./ui/Toast.js";
import { saveTasks, loadTasks } from "./utils/storage.js";

const app = document.getElementById("app")!;
const modal = document.getElementById("formModal")!;
const openBtn = document.getElementById("openFormBtn")!;

const toast = new Toast();

// store tasks
const tasks: Task[] = loadTasks(); // load tasks

// container
const boardContainer = document.createElement("div");

// add to DOM
app.appendChild(boardContainer);

// Open pop
openBtn.addEventListener("click", () => {
  modal.classList.remove("translate-x-full");

  // render form
  renderForm(modal, (task) => {
    tasks.push(task);
    saveTasks(tasks); // save task in local storage

    renderBoard(boardContainer, tasks, handleDelete, handleEdit);

    toast.show("Task added successfully ✅", "success");
    modal.classList.add("translate-x-full");
  });
});

function handleDelete(id: string) {
  const index = tasks.findIndex((t) => t.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);

    saveTasks(tasks); // ✅ update storage
    renderBoard(boardContainer, tasks, handleDelete, handleEdit);

    toast.show("Task deleted 🗑️", "warning");
  }
}

function handleEdit(task: Task) {
  modal.classList.remove("translate-x-full");

  // render form
  renderForm(
    modal,
    (newTask) => {
      const index = tasks.findIndex((t) => t.id === task.id);

      if (index !== -1) {
        tasks[index] = newTask;

        saveTasks(tasks); // ✅ update storage
        renderBoard(boardContainer, tasks, handleDelete, handleEdit);

        toast.show("Task updated successfully ✅", "success");
      }
      modal.classList.add("translate-x-full");
    },
    task,
  );
}

// initial render
renderBoard(boardContainer, tasks, handleDelete, handleEdit);
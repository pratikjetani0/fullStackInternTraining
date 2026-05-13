import { Priority, TaskStatus } from "../types/index.js";
import type { Task } from "../types/index.js";
import { Toast } from "./Toast.js";

const toast = new Toast();
export function renderForm(
  container: HTMLElement,
  onAdd: (task: Task) => void,
  existingTask?: Task,
) {
  const form = createForm();

  container.innerHTML = "";
  container.appendChild(form);

  const input = form.querySelector("#taskInput") as HTMLInputElement;
  const desc = form.querySelector("#task-desc") as HTMLTextAreaElement;
  const priority = form.querySelector("#priority") as HTMLSelectElement;
  const status = form.querySelector("#status") as HTMLSelectElement;

  if (existingTask) {
    input.value = existingTask.title;
    desc.value = existingTask.description || "";
    priority.value = existingTask.priority;
    status.value = existingTask.status;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    //Validation
    if (!input.value.trim()) {
      toast.show("Task cannot be empty ❌", "error");
      return;
    }

    // task object
    const task: Task = existingTask
      ? {
          ...existingTask,
          title: input.value,
          description: desc.value,
          status: status.value as TaskStatus,
          priority: priority.value as Priority,
          updatedAt: Date.now(),
        }
      : {
          id: Date.now().toString(),
          title: input.value,
          description: desc.value,
          status: status.value as TaskStatus,
          priority: priority.value as Priority,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

    // add task
    onAdd(task);

    // clear input
    input.value = "";
    desc.value = "";

    // close modal after submit
    container.classList.add("translate-x-full");
  });
}

function createForm(): HTMLFormElement {
  const form = document.createElement("form");

  form.className = "flex flex-col gap-3";

  form.innerHTML = `
    <div class="flex justify-between
    ">
    
      <h2 class="text-lg font-bold mb-2">New Task</h2>
      <button class="size-2 ml-5" onclick="form.close()">❌</button>
    </div>

    <input 
      type="text" 
      placeholder="Enter task..." 
      id="taskInput"
      class="p-2 text-white rounded border border-gray-700"
    />

    <textarea 
      id="task-desc" 
      rows="3" 
      class="p-2 text-white rounded border border-gray-700"  
      placeholder="Task details..."
    ></textarea>

    <label class="text-gray-200"> Priority </label>
    <select id="priority" class="p-2 text-white bg-gray-800 rounded border border-gray-700">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <label class="text-gray-200"> Task Status </label>
    <select id="status" class="p-2 text-white bg-gray-800 rounded border border-gray-700">
      <option value="todo">Todo</option>
      <option value="in-progress">In Progress</option>
      <option value="done">Done</option>
    </select>

    <button class="bg-blue-500 px-4 py-2 rounded">
      Add Task
    </button>
  `;

  return form;
}
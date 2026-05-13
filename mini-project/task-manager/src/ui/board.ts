import type { Task } from "../types/index.js";
import { TaskStatus } from "../types/index.js";

export function renderBoard(
  container: HTMLElement,
  tasks: Task[],
  onDelete: (id: string) => void,
  onEdit: (task: Task) => void,
) {
  container.innerHTML = "";

  if (tasks.length === 0) {
    container.innerHTML = `<p class="text-gray-400">No tasks yet</p>`;
    return;
  }

  const board = createBoard(tasks, onDelete, onEdit);
  container.appendChild(board);
}

function createBoard(
  tasks: Task[],
  onDelete: (id: string) => void,
  onEdit: (task: Task) => void,
) {
  const columns = [
    { title: "Todo", status: TaskStatus.TODO },
    { title: "In Progress", status: TaskStatus.IN_PROGRESS },
    { title: "Done", status: TaskStatus.DONE },
  ];

  const board = document.createElement("div");
  board.className = "grid grid-cols-3 gap-4";

  columns.forEach((col) => {
    const colDiv = createColumn(col.title);

    const filteredTasks = tasks.filter((task) => task.status === col.status);

    filteredTasks.forEach((task) => {
      const taskCard = createTaskCard(task, onDelete, onEdit);
      colDiv.appendChild(taskCard);
    });

    board.appendChild(colDiv);
  });

  return board;
}

function createColumn(title: string) {
  const colDiv = document.createElement("div");
  colDiv.className = "bg-gray-800 p-4 rounded-md shadow";

  colDiv.innerHTML = `<h2 class="font-bold mb-2">${title}</h2>`;

  return colDiv;
}

function createTaskCard(
  task: Task,
  onDelete: (id: string) => void,
  onEdit: (task: Task) => void,
) {
  const taskDiv = document.createElement("div");

  taskDiv.className = "bg-gray-700 p-2 rounded-md shadow mb-2";

  const priorityColor =
    task.priority === "high"
      ? "bg-orange-500"
      : task.priority === "medium"
        ? "bg-yellow-500"
        : "bg-green-500";

  taskDiv.innerHTML = `
    <h3 class="font-bold text-lg">${task.title}</h3>

    <p class="text-sm text-gray-400">
      ${task.description || "No description"}
    </p>

    <div class="flex justify-between items-center mt-4">
      <span class="px-2 py-1 rounded text-xs font-bold uppercase ${priorityColor}">
        ${task.priority}
      </span>

      <div>
        <button class="edit bg-blue-500 text-white text-xs px-3 py-1.5 rounded cursor-pointer">
          Edit
        </button>

        <button class="delete bg-red-500 text-white text-xs px-3 py-1.5 rounded cursor-pointer">
          Delete
        </button>
      </div>
    </div>
  `;

  const deleteBtn = taskDiv.querySelector(".delete")!;
  deleteBtn.addEventListener("click", () => onDelete(task.id));

  const editBtn = taskDiv.querySelector(".edit")!;
  editBtn.addEventListener("click", () => onEdit(task));

  return taskDiv;
}
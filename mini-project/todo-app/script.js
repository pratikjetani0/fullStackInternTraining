function addTodo() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  let li = document.createElement("li");

  // For Drag and Drop list(todos)
  li.setAttribute("draggable", "true");
  li.addEventListener("dragstart", handleDragStart);
  li.addEventListener("dragover", handleDragOver);
  li.addEventListener("drop", handleDrop);

  li.innerHTML = `
    
    <input type="checkbox" onchange="todoComplete(this)" />
    <span> ${taskText} </span> 
    <button onclick="todoDelete(this)" > ❌ </button>
    
  `;

  document.getElementById("taskList").appendChild(li); // passing li as string // mistake
  taskInput.value = "";
}

// complete to do when like it to line through on text
function todoComplete(checkbox) {
  checkbox.parentElement.classList.toggle("completed", checkbox.checked);
}

// it will remove the li when ever click this
function todoDelete(button) {
  button.parentElement.remove();
}

let draggedItem = null; // Stores the current dragged item

// Resource from W3school
function handleDragStart(e) {
  // store the item
  console.log(this);
  console.log(e);

  draggedItem = this;
}

function handleDragOver(e) {
  // it allows to drop
  e.preventDefault();
}

function handleDrop() {
  // inserts item at new position
  if (this !== draggedItem) {
    let list = document.getElementById("taskList");
    list.insertBefore(draggedItem, this); // Moves the dragged item before the item you dropped on
  }
}

document.getElementById("taskInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

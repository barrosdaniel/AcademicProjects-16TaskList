// Define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load All Event Listeners
loadEventListeners();

// Load All Event Listeners
function loadEventListeners() {
  // Add Task Event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear tasks event
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Enter a task");
  }

  // Create li element
  const li = document.createElement("li");
  // Add Materialize li class
  li.className = "collection-item";
  // Create Text node and append to li
  const textNode = document.createTextNode(taskInput.value);
  li.appendChild(textNode);

  // Create new link element
  const link = document.createElement("a");
  // Add class to link
  link.className = "delete-item secondary-content";
  // Add icon
  link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
  // Append link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = "";

  e.preventDefault();
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure you want to delete this task?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Clear Tasks
function clearTasks(e) {
  console.log("Clear Tasks pressed!");

  // Option 1 (slower)
  // taskList.innerHTML = "";

  // Option 2 (recommended)
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  e.preventDefault();
}

// Filter Tasks
function filterTasks(e) {
  // Get value of filter field
  const text = e.target.value.toLowerCase();

  // Get all lis
  const lis = document.querySelectorAll(".collection-item");
  lis.forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

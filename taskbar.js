const moodSelect = document.getElementById("mood-select");
const taskList = document.getElementById("task-list");
const happinessFill = document.getElementById("happiness-fill");
const THIRTY_MINUTES =  30 * 60 * 1000;

// Load happiness from localStorage or default to 20
let savedHappiness = parseInt(localStorage.getItem("happiness"));
let happiness;
if (!isNaN(savedHappiness)) {
  happiness = savedHappiness;
} else {
  happiness = 20;
}

// Update the happiness bar immediately
happinessFill.style.width = happiness + "%";

let currentMood = moodSelect.value;
let displayedTasks = [];


// Load initial tasks
function loadTasks(mood) {
  currentMood = mood;
  displayedTasks = generateTaskQueue(mood, 5);
  renderTasks();
}

// Render tasks in DOM
function renderTasks() {
  taskList.innerHTML = "";
  displayedTasks.forEach(task => {
    const container = document.createElement("div");
    container.className = "task-container";
    container.innerHTML = `
      <input type="checkbox" class="task-checkbox" />
      <span class="task-text">${task}</span>
      <button class="skip-btn">⟳</button>
    `;
    taskList.appendChild(container);

    // Complete task
    container.querySelector(".task-checkbox").addEventListener("change", function() {
      if (this.checked) completeTask(task);
    });

    // Skip task
    container.querySelector(".skip-btn").addEventListener("click", () => skipTask(task));
  });
}

// Complete a task: remove it and add new one if available
function completeTask(task) {
  increaseHappiness();
  replaceTask(task);
}

// Skip a task without affecting happiness
function skipTask(task) {
  replaceTask(task);
}

// Replace a task with a new one from the mood pool
function replaceTask(oldTask) {
  const newTask = getNextTask(currentMood, displayedTasks);
  if (newTask) {
    displayedTasks = displayedTasks.map(t => t === oldTask ? newTask : t);
  } else {
    // Remove if no new tasks
    displayedTasks = displayedTasks.filter(t => t !== oldTask);
  }
  renderTasks();
}

// Increase happiness bar
function increaseHappiness() {
  happiness = Math.min(happiness + 10, 100);
  happinessFill.style.width = happiness + "%";

  //Save value
  localStorage.setItem("happiness", happiness);
}

//Function to decrease happiness bar
function decreaseHappiness() {
  happiness = Math.max(0, happiness - 5);
  happinessFill.style.width = happiness + "%";
  localStorage.setItem("happiness", happiness);
}

//Interval of every 30 minutes to decrease hapiness
setInterval(decreaseHappiness, THIRTY_MINUTES);

// Event: mood change
moodSelect.addEventListener("change", e => loadTasks(e.target.value));

// Initial load
loadTasks(currentMood);

const moodSelect = document.getElementById("mood-select");
const taskList = document.getElementById("task-list");
const happinessFill = document.getElementById("happiness-fill");

let happiness = 20;
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
}

// Event: mood change
moodSelect.addEventListener("change", e => loadTasks(e.target.value));

// Initial load
loadTasks(currentMood);

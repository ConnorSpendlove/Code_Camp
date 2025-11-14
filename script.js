// Mood-based tasks
const moodTasks = {
  stressed: [
    "Take 3 deep breaths",
    "Step outside for 1 minute",
    "Write down one worry"
  ],
  low: [
    "Drink a glass of water",
    "Do a 30-second stretch",
    "Listen to a favorite song"
  ],
  overwhelmed: [
    "Break your task into 1 small step",
    "Clean one tiny area",
    "Tell someone you're overwhelmed"
  ],
  motivated: [
    "Work for 5 focused minutes",
    "Plan one goal for today",
    "Celebrate one small win"
  ],
  happy: [
    "Send someone a kind message",
    "Take a picture of something nice",
    "Enjoy 1 quiet minute"
  ]
};

const moodSelect = document.getElementById("mood-select");
const taskList = document.getElementById("task-list");
const happinessFill = document.getElementById("happiness-fill");

let happiness = 20; // starting level

// Populate tasks based on mood
function loadTasks(mood) {
  taskList.innerHTML = "";

  moodTasks[mood].forEach(task => {
    const container = document.createElement("label");
    container.innerHTML = `
      <input type="checkbox" class="task-checkbox" />
      ${task}
      <br>
    `;
    taskList.appendChild(container);
  });

  // Add event listeners for new checkboxes
  document.querySelectorAll(".task-checkbox").forEach(box => {
    box.addEventListener("change", increaseHappiness);
  });
}

// Increase happiness when tasks are checked
function increaseHappiness() {
  if (this.checked) {
    happiness = Math.min(happiness + 10, 100);
  } else {
    happiness = Math.max(happiness - 10, 0);
  }
  happinessFill.style.width = happiness + "%";
}

// Default load
loadTasks("stressed");

// Whenever mood changes → load new tasks
moodSelect.addEventListener("change", e => {
  loadTasks(e.target.value);
});

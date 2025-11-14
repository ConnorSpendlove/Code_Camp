// Mood-based tasks
 const moodTasks = {
  happy: [
    "Write down one thing you're grateful for",
    "Compliment yourself in one sentence",
    "Send a positive message to someone",
    "Take a picture of something beautiful right now",
    "Dance for 30 seconds",
    "Drink a glass of water",
    "Stretch your arms overhead for 10 seconds",
    "Walk around your room for 1 minute",
    "Smile at yourself in a mirror",
    "Celebrate a small win out loud",
    "Listen to your favorite song",
    "Do one simple chore (make your bed, tidy desk)",
    "Write down one goal for today",
    "Step outside and breathe fresh air",
    "Take 5 deep breaths",
    "Try a new emoji when texting someone",
    "Watch something funny (short clip)",
    "Move your body for 60 seconds",
    "Hydrate your lips or hands",
    "Plan something fun for later",
    "Share good news with someone",
    "Organize one app or folder",
    "Take a 'victory pose' for 10 seconds",
    "Write a positive thought in a notes app",
    "Do a mini meditation (30 seconds)"
  ],

  sad: [
    "Drink a glass of water slowly",
    "Take 5 deep belly breaths",
    "Step outside for 2 minutes",
    "Play a comforting song",
    "Hug yourself for 5 seconds",
    "Text a friend or family member",
    "Journal one sentence about how you feel",
    "Stretch your neck gently",
    "Look at something soft or calming",
    "Watch a short comforting video",
    "Clean one tiny area (desk corner)",
    "Sit somewhere comfortable for 2 minutes",
    "Write down one thing you're proud of",
    "Put on a cozy sweater or blanket",
    "Light or imagine a calming scent",
    "Drink warm tea or water",
    "Look at a photo that makes you smile",
    "Go somewhere with natural light",
    "Step away from screens for 1 minute",
    "Do a slow forward fold stretch",
    "Take a slow walk inside your home",
    "Pet an animal or imagine one you love",
    "Take 3 slow inhales + 3 slow exhales",
    "Name one thing you can control today",
    "Sit with your feelings for 20 seconds without judging them"
  ],

  angry: [
    "Take 5 deep breaths with long exhales",
    "Walk fast for 1 minute",
    "Squeeze your hands into fists for 5 seconds then release",
    "Drink cold water slowly",
    "Stretch your shoulders",
    "Do 10 jumping jacks (optional)",
    "Write down what's bothering you (1 sentence)",
    "Throw a pillow onto your bed",
    "Listen to a calming track",
    "Look away from screens for 1 minute",
    "Wash your face with cool water",
    "Step outside briefly",
    "Count backwards from 20",
    "Do a big sigh (really loud if possible)",
    "Stretch your jaw",
    "Shake your arms for 10 seconds",
    "Organize something small",
    "Do a long exhale (8 seconds)",
    "Hold something cold in your hand",
    "Pace gently for 30 seconds",
    "Say one calming phrase: “I’m okay”",
    "Look at a nature picture",
    "Write a message you won’t send",
    "Sit still for 20 seconds",
    "Do a wall push-up (5 times)"
  ],

  anxious: [
    "Inhale for 4 seconds, exhale for 6",
    "Look around and name 3 things you see",
    "Drink water mindfully",
    "Put both hands on your chest and breathe",
    "Walk slowly for 1 minute",
    "Stretch your arms, then relax them",
    "Listen to white noise or calm music",
    "Do a 5-second body scan",
    "Look at something blue or calming",
    "Touch something with texture (grounding)",
    "Write down your worry in 1 sentence",
    "Step away from your phone for 1 minute",
    "Loosen your shoulders",
    "Splash cool water on your face",
    "Take 3 paced breaths",
    "Open a window or step outside",
    "Sit with your feet flat on the ground",
    "Look at a cozy or comforting photo",
    "Do a quick stretch routine (20 seconds)",
    "Imagine inhaling calm, exhaling stress",
    "Make a 1-step plan for your next task",
    "Sit up straight for 10 seconds",
    "Relax your jaw",
    "Do a small hand stretch",
    "Repeat to yourself: “I am safe right now.”"
  ],

  afraid: [
    "Take 5 slow breaths",
    "Turn on a light (literal or metaphorical)",
    "Text someone you trust",
    "Watch a comforting or familiar video",
    "Hold a soft object",
    "Drink something warm",
    "Sit with your back against a wall",
    "Look at something that makes you feel safe",
    "Count 10 objects around you",
    "Put both feet firmly on the ground",
    "Stretch your neck",
    "Play calming music",
    "Say a grounding phrase: “I am okay. This moment will pass.”",
    "Step outside to reset your environment",
    "Imagine a safe place visually",
    "Do a slow forward fold",
    "Name a person who makes you feel safe",
    "Move to a brighter room",
    "Relax your shoulders intentionally",
    "Take a picture of something calming",
    "Write a short note about what’s scaring you",
    "Drink water slowly",
    "Focus on feeling your breath in your chest",
    "Sit comfortably for 30 seconds",
    "Look at a familiar object that comforts you"
  ]
};
const moodSelect = document.getElementById("mood-select");
const taskList = document.getElementById("task-list");
let currentMood = moodSelect.value;
let displayedTasks;

//Checking if tasks are stored in local storage
let storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  displayedTasks = JSON.parse(storedTasks);
} else {
  displayedTasks = generateTaskQueue(currentMood, 5);
}

renderTasks();

// Load tasks
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
  saveTasksToLocalStorage();
}

// Skip a task without affecting happiness
function skipTask(task) {
  replaceTask(task);
  saveTasksToLocalStorage();
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

// Function to shuffle array
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Task generator
function generateTaskQueue(mood, count = 5) {
  const tasks = [...moodTasks[mood]]; // copy
  const shuffled = shuffleArray(tasks);
  return shuffled.slice(0, count);
}

// Function to get next task from mood pool
function getNextTask(mood, displayedTasks) {
  const remaining = moodTasks[mood].filter(task => !displayedTasks.includes(task));
  if (remaining.length === 0) return null; // no more tasks
  const nextTask = remaining[Math.floor(Math.random() * remaining.length)];
  return nextTask;
}

//Saving tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(displayedTasks));
}

// Event: mood change
moodSelect.addEventListener("change", e => {
  currentMood = e.target.value;
  displayedTasks = generateTaskQueue(currentMood, 5); // refresh tasks
  renderTasks();
  saveTasksToLocalStorage();
});


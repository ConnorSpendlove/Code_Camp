const canvas = document.getElementById("runner-canvas");
const ctx = canvas.getContext("2d");

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const restartBtn = document.getElementById("restart-btn");

let score = 0;
let highScore = localStorage.getItem("foxRunnerHighScore") || 0;
highScoreDisplay.textContent = highScore;

// Player state
let fox = {
  x: 70,
  y: 220,
  width: 100,
  height: 100,
  vy: 0,
  jumping: false,
  frame: 1,
};

// Load fox sprites
const foxRun1 = new Image();
foxRun1.src = "../../images/mochi_run1.png";

const foxRun2 = new Image();
foxRun2.src = "../../images/mochi_run2.png";

const foxJump = new Image();
foxJump.src = "../../images/mochi_jump.png";

// Obstacles
let obstacles = [];
let gameOver = false;
let lastFrameSwitch = 0;

// Gravity
const gravity = 1;

// Spawn obstacle every 1.2–2 seconds
function spawnObstacle() {
  const height = Math.random() > 0.5 ? 40 : 60;
  obstacles.push({
    x: canvas.width,
    y: 260 - height,
    width: height,
    height: height,
  });

  if (!gameOver) {
    setTimeout(spawnObstacle, 800 + Math.random() * 800);
  }
}

spawnObstacle();

// Draw fox based on state
function drawFox() {
  let img;

  if (fox.jumping) {
    img = foxJump;
  } else {
    img = fox.frame === 1 ? foxRun1 : foxRun2;
  }

  ctx.drawImage(img, fox.x, fox.y, fox.width, fox.height);
}

// Jump mechanic
function jump() {
  if (!fox.jumping) {
    fox.vy = -18;
    fox.jumping = true;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") jump();
});

// Main game loop
function update(timestamp) {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // FOX PHYSICS
  fox.y += fox.vy;
  fox.vy += gravity;

  if (fox.y >= 220) {
    fox.y = 220;
    fox.jumping = false;
  }

  // Switch running frames every 1.5s
  if (!fox.jumping && timestamp - lastFrameSwitch > 150) {
    fox.frame = fox.frame === 1 ? 2 : 1;
    lastFrameSwitch = timestamp;
  }

  drawFox();

  // OBSTACLES
  obstacles.forEach((o) => {
    o.x -= 7;
    ctx.fillStyle = "#333";
    ctx.fillRect(o.x, o.y, o.width, o.height);

    // Collision detection
    if (
      fox.x < o.x + o.width &&
      fox.x + fox.width > o.x &&
      fox.y < o.y + o.height &&
      fox.y + fox.height > o.y
    ) {
      endGame();
    }
  });

  obstacles = obstacles.filter((o) => o.x + o.width > 0);

  // SCORE
  score += 1;
  scoreDisplay.textContent = score;

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

function endGame() {
  gameOver = true;
  restartBtn.classList.remove("hidden");

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("foxRunnerHighScore", highScore);
    highScoreDisplay.textContent = highScore;
  }
}

restartBtn.addEventListener("click", () => {
  // Reset game
  score = 0;
  scoreDisplay.textContent = 0;
  fox.y = 220;
  fox.vy = 0;
  fox.jumping = false;

  obstacles = [];
  gameOver = false;
  restartBtn.classList.add("hidden");

  spawnObstacle();
  requestAnimationFrame(update);
});

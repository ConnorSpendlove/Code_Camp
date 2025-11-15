const canvas = document.getElementById("runner-canvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");

let score = 0;
let highScore = localStorage.getItem("foxRunnerHighScore") || 0;
highScoreDisplay.textContent = highScore;

let gameRunning = false;
let gameOver = false;
let lastFrameSwitch = 0;

// NEW: Adjusted ground level for big fox
const GROUND_Y = 180; // moves fox up so he's not buried

// Fox player
let fox = {
  x: 70,
  y: GROUND_Y,
  width: 150,
  height: 150,
  vy: 0,
  jumping: false,
  frame: 1,
};

// Load sprites
const foxRun1 = new Image();
foxRun1.src = "../../images/mochi_run1.png";

const foxRun2 = new Image();
foxRun2.src = "../../images/mochi_run2.png";

const foxJump = new Image();
foxJump.src = "../../images/mochi_jump.png";

const obstacleImg = new Image();
obstacleImg.src = "../../images/mochi_food.png";

// Obstacles
let obstacles = [];
const gravity = 0.5;

function spawnObstacle() {
  if (!gameRunning || gameOver) return;

  obstacles.push({
    x: canvas.width,
    y: GROUND_Y + 60, // ground aligned
    width: 60,
    height: 60,
  });

  setTimeout(spawnObstacle, 1000 + Math.random() * 700);
}

// Draw fox
function drawFox(timestamp) {
  let img;

  if (fox.jumping) {
    img = foxJump;
  } else {
    if (timestamp - lastFrameSwitch > 150) {
      fox.frame = fox.frame === 1 ? 2 : 1;
      lastFrameSwitch = timestamp;
    }
    img = fox.frame === 1 ? foxRun1 : foxRun2;
  }

  ctx.drawImage(img, fox.x, fox.y, fox.width, fox.height);
}

// Jump
function jump() {
  if (!fox.jumping && gameRunning) {
    fox.vy = -14;
    fox.jumping = true;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") jump();
});

canvas.addEventListener("touchstart", () => jump());

// Game loop
function update(timestamp) {
  if (!gameRunning || gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // FOX PHYSICS
  fox.y += fox.vy;
  fox.vy += gravity;

  if (fox.y >= GROUND_Y) {
    fox.y = GROUND_Y;
    fox.jumping = false;
  }

  drawFox(timestamp);

  // OBSTACLES
  obstacles.forEach((obs) => {
    obs.x -= 6.5; // SLOWER SCROLL SPEED
    ctx.drawImage(obstacleImg, obs.x, obs.y, obs.width, obs.height);

    // FORGIVING COLLISION BOX
    const shrink = 30;

    const foxHit = {
      x: fox.x + shrink,
      y: fox.y + shrink,
      width: fox.width - shrink * 2,
      height: fox.height - shrink * 2,
    };

    if (
      foxHit.x < obs.x + obs.width &&
      foxHit.x + foxHit.width > obs.x &&
      foxHit.y < obs.y + obs.height &&
      foxHit.y + foxHit.height > obs.y
    ) {
      return endGame();
    }
  });

  obstacles = obstacles.filter((o) => o.x + o.width > 0);

  score++;
  scoreDisplay.textContent = score;

  requestAnimationFrame(update);
}

// START BUTTON
startBtn.addEventListener("click", () => {
  score = 0;
  fox.y = GROUND_Y;
  fox.vy = 0;
  fox.jumping = false;
  obstacles = [];
  gameOver = false;

  startBtn.classList.add("hidden");
  restartBtn.classList.add("hidden");

  gameRunning = true;
  spawnObstacle();
  requestAnimationFrame(update);
});

// RESTART BUTTON
restartBtn.addEventListener("click", () => {
  score = 0;
  fox.y = GROUND_Y;
  fox.vy = 0;
  fox.jumping = false;
  obstacles = [];
  gameOver = false;

  restartBtn.classList.add("hidden");

  gameRunning = true;
  spawnObstacle();
  requestAnimationFrame(update);
});

// GAME OVER
function endGame() {
  gameOver = true;
  gameRunning = false;

  restartBtn.classList.remove("hidden");

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("foxRunnerHighScore", highScore);
    highScoreDisplay.textContent = highScore;
  }
}

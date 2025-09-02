const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Load characters
const playerImg = new Image();
playerImg.src = "player.png";

const enemyImg = new Image();
enemyImg.src = "enemy.png";

// Characters
const player = {
  x: 150,
  y: 320,
  width: 100,
  height: 150,
  health: 100,
  attack: false,
  color: "#00eaff",
  isMovingLeft: false,
  isMovingRight: false
};

const enemy = {
  x: 750,
  y: 320,
  width: 100,
  height: 150,
  health: 100,
  attack: false,
  color: "#ff4f81",
  isMovingLeft: false,
  isMovingRight: false
};

// Draw
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Health Bars
  ctx.fillStyle = "#222";
  ctx.fillRect(40, 20, 400, 25);
  ctx.fillRect(560, 20, 400, 25);

  ctx.fillStyle = player.color;
  ctx.fillRect(40, 20, player.health * 4, 25);

  ctx.fillStyle = enemy.color;
  ctx.fillRect(960 - enemy.health * 4, 20, enemy.health * 4, 25);

  // Player
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

  // Enemy
  ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);

  // Attack effects
  if (player.attack) {
    ctx.fillStyle = "rgba(0,234,255,0.3)";
    ctx.fillRect(player.x + player.width, player.y, 40, player.height);
  }
  if (enemy.attack) {
    ctx.fillStyle = "rgba(255,79,129,0.3)";
    ctx.fillRect(enemy.x - 40, enemy.y, 40, enemy.height);
  }
}

// Collision
function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// Update
function update() {
  if (player.isMovingLeft) player.x -= 5;
  if (player.isMovingRight) player.x += 5;
  if (enemy.isMovingLeft) enemy.x -= 5;
  if (enemy.isMovingRight) enemy.x += 5;

  if (player.attack && isColliding(player, enemy)) {
    enemy.health = Math.max(0, enemy.health - 1);
  }
  if (enemy.attack && isColliding(enemy, player)) {
    player.health = Math.max(0, player.health - 1);
  }

  if (player.health <= 0 || enemy.health <= 0) {
    setTimeout(() => {
      alert(player.health <= 0 ? "Enemy Wins!" : "Player Wins!");
      player.health = 100;
      enemy.health = 100;
    }, 100);
  }
}

// Button Controls (for both mouse and touch)
const p1Left = document.getElementById("p1-left");
const p1Right = document.getElementById("p1-right");
const p1Attack = document.getElementById("p1-attack");

const p2Left = document.getElementById("p2-left");
const p2Right = document.getElementById("p2-right");
const p2Attack = document.getElementById("p2-attack");

// Player 1 controls
p1Left.addEventListener('mousedown', () => player.isMovingLeft = true);
p1Left.addEventListener('mouseup', () => player.isMovingLeft = false);
p1Left.addEventListener('touchstart', (e) => { e.preventDefault(); player.isMovingLeft = true; });
p1Left.addEventListener('touchend', () => player.isMovingLeft = false);

p1Right.addEventListener('mousedown', () => player.isMovingRight = true);
p1Right.addEventListener('mouseup', () => player.isMovingRight = false);
p1Right.addEventListener('touchstart', (e) => { e.preventDefault(); player.isMovingRight = true; });
p1Right.addEventListener('touchend', () => player.isMovingRight = false);

p1Attack.addEventListener('mousedown', () => player.attack = true);
p1Attack.addEventListener('mouseup', () => player.attack = false);
p1Attack.addEventListener('touchstart', (e) => { e.preventDefault(); player.attack = true; });
p1Attack.addEventListener('touchend', () => player.attack = false);

// Player 2 controls
p2Left.addEventListener('mousedown', () => enemy.isMovingLeft = true);
p2Left.addEventListener('mouseup', () => enemy.isMovingLeft = false);
p2Left.addEventListener('touchstart', (e) => { e.preventDefault(); enemy.isMovingLeft = true; });
p2Left.addEventListener('touchend', () => enemy.isMovingLeft = false);

p2Right.addEventListener('mousedown', () => enemy.isMovingRight = true);
p2Right.addEventListener('mouseup', () => enemy.isMovingRight = false);
p2Right.addEventListener('touchstart', (e) => { e.preventDefault(); enemy.isMovingRight = true; });
p2Right.addEventListener('touchend', () => enemy.isMovingRight = false);

p2Attack.addEventListener('mousedown', () => enemy.attack = true);
p2Attack.addEventListener('mouseup', () => enemy.attack = false);
p2Attack.addEventListener('touchstart', (e) => { e.preventDefault(); enemy.attack = true; });
p2Attack.addEventListener('touchend', () => enemy.attack = false);

// Game loop
function gameLoop() {
  draw();
  update();
  requestAnimationFrame(gameLoop);
}

gameLoop();
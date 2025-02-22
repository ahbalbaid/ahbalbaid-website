const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ship = {
  x: canvas.width / 2 - 15,
  y: canvas.height - 40,
  dx: 5,
  width: 30,
  height: 30,
  draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && ship.x > 0) {
    ship.x -= ship.dx;
  } else if (e.key === "ArrowRight" && ship.x < canvas.width - ship.width) {
    ship.x += ship.dx;
  } else if (e.code === "Space") {
    shootBullet();
    e.preventDefault();
  }
});

const enemies = [];
const enemyProps = {
  width: 20,
  height: 20,
  dx: 2,
  dy: 0,
  rows: 5,
  cols: 10,
  gap: 10,
};

function createEnemies() {
  for (let row = 0; row < enemyProps.rows; row++) {
    for (let col = 0; col < enemyProps.cols; col++) {
      const x = col * (enemyProps.width + enemyProps.gap);
      const y = row * (enemyProps.height + enemyProps.gap);
      enemies.push({ x, y });
    }
  }
}

function drawEnemies() {
  ctx.fillStyle = "red";
  enemies.forEach((enemy) => {
    ctx.fillRect(enemy.x, enemy.y, enemyProps.width, enemyProps.height);
  });
}

function updateEnemies() {
  for (let enemy of enemies) {
    enemy.x += enemyProps.dx;

    if (enemy.x < 0 || enemy.x > canvas.width - enemyProps.width) {
      enemyProps.dx = -enemyProps.dx;
      for (let e of enemies) {
        e.y += enemyProps.dy;
      }
      break;
    }
  }
}

const bullets = [];
const bulletProps = {
  width: 5,
  height: 10,
  dy: -4,
};

function shootBullet() {
  const bullet = {
    x: ship.x + ship.width / 2 - bulletProps.width / 2,
    y: ship.y,
    width: bulletProps.width,
    height: bulletProps.height,
  };
  bullets.push(bullet);
}

function drawBullets() {
  ctx.fillStyle = "yellow";
  bullets.forEach((bullet) => {
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });
}

function updateBullets() {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].y += bulletProps.dy;

    // Remove bullet if it goes out of canvas
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
      i--;
    }
  }
}

function isColliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

let score = 0; // Initialize score

function checkBulletEnemyCollisions() {
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < enemies.length; j++) {
      if (isColliding(bullets[i], enemies[j])) {
        console.log("Collision Detected");
        bullets.splice(i, 1);
        i--; // Adjust index after splice
        enemies.splice(j, 1);
        j--; // Adjust index after splice
        score++;
        break; // exit the inner loop for this bullet
      }
    }
  }
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ship.draw();
  drawEnemies();
  drawBullets();
  drawScore();

  updateEnemies();
  updateBullets();
  checkBulletEnemyCollisions();

  requestAnimationFrame(animate);
}

createEnemies();
animate();

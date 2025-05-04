document.body.style.height = "100vh";
document.body.style.margin = "0";
document.body.style.background = "linear-gradient(90deg, rgba(41, 35, 35, 1) 4%, rgba(133, 133, 103, 1) 50%, rgba(33, 26, 26, 1) 100%)";
document.body.style.fontFamily = "sans-serif";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const numOfCellsX = 20;
const numOfCellsY = 20;
canvas.width = window.innerWidth * 0.6;
canvas.height = canvas.width * 0.7;
let gameOver=null;
let gameInterval;
canvas.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.7)";
canvas.style.borderRadius = "10px";

function applyResponsiveStyles() {
  const screenWidth = window.innerWidth;

  let canvasWidth;
  if (screenWidth <= 480) {
    canvasWidth = screenWidth * 0.95;
    document.getElementById("h1").style.fontSize = "1.2em";
    document.getElementById("score0").style.fontSize = "1.2em";
  } else if (screenWidth <= 768) {
    canvasWidth = screenWidth * 0.85;
    document.getElementById("h1").style.fontSize = "1.5em";
    document.getElementById("score0").style.fontSize = "1.5em";
  } else if (screenWidth <= 1024) {
    canvasWidth = screenWidth * 0.75;
    document.getElementById("h1").style.fontSize = "1.7em";
    document.getElementById("score0").style.fontSize = "1.7em";
  } else {
    canvasWidth = screenWidth * 0.6;
    document.getElementById("h1").style.fontSize = "2em";
    document.getElementById("score0").style.fontSize = "2em";
  }

  // שינוי מידות הקנבס
  canvas.width = canvasWidth;
  canvas.height = canvasWidth * 0.7;

  // עדכון הגריד בהתאם לגודל החדש
  gridX = canvas.width / numOfCellsX;
  gridY = canvas.height / numOfCellsY;
}



const container= document.querySelector(".container");
container.style.position = "relative";
container.style.display="flex";
container.style.flexDirection = "column";
container.style.justifyContent = "center";
container.style.alignItems="center";


let gridX = canvas.width / numOfCellsX;
let gridY = canvas.height / numOfCellsY;

let score = 0;
let snake = [{ x: 1, y: 10 }];
let goX = 0, goY = 0;

let food = {
  x: Math.floor(Math.random() * numOfCellsX),
  y: Math.floor(Math.random() * numOfCellsY)
};


const board = new Image();
board.src= "assets/snakeBoard.jpg";

const snakeBodyImage = new Image();
snakeBodyImage.src = "assets/snakeBody.png";

const snakeTailImage = new Image();
snakeTailImage.src = "assets/snakeTail.png";

const snakeHeadImage = new Image();
snakeHeadImage.src = "assets/snakeHead.png";

const snakeFoodImage = new Image();
snakeFoodImage.src = "assets/food.png";

const snakeHeadMirrorImage = new Image();
snakeHeadMirrorImage.src = "assets/snakeHeadMirror.png";

const snakeTailMirrorImage = new Image();
snakeTailMirrorImage.src = "assets/snakeTailMirror.png";


document.addEventListener("keydown", (ev) => {
  if (ev.key === "ArrowLeft") (goX = -1), (goY = 0);
  if (ev.key === "ArrowRight") (goX = 1), (goY = 0);
  if (ev.key === "ArrowUp") (goX = 0), (goY = -1);
  if (ev.key === "ArrowDown") (goX = 0), (goY = 1);
});

function startGame() {
  const styleScore = document.querySelector("#score0");
  styleScore.style.color = "rgb(211, 219, 223)";
  styleScore.style.fontSize = "2em";
  const styleH1 = document.querySelector("#h1");
  styleH1.style.color = "rgb(211, 219, 223)";
  styleH1.style.fontSize = "2em";
  styleH1.style.textAlign="center";

  score = 0;
  snake = [{ x: 1, y: 10 }];
  goX = 0;
  goY = 0;
  food = {
    x: Math.floor(Math.random() * numOfCellsX),
    y: Math.floor(Math.random() * numOfCellsY)
  };
  if (gameOver) {
    gameOver.remove();
    gameOver = null;
  }
  gameInterval = setInterval(gameLoop, 300);
}


function gameLoop() {
  
  const head = {
    x: (snake[0].x + goX + numOfCellsX) % numOfCellsX,
    y: (snake[0].y + goY + numOfCellsY) % numOfCellsY     
  };

  if (snake.some((part) => part.x === head.x && part.y === head.y)) {
    if (snake.length > 1){
    snake = [head];
    score = 0;
    showGameOverScreen();
    return;
    }


  } else {
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score++;
      food = {

        x: Math.floor(Math.random() * numOfCellsX),
        y: Math.floor(Math.random() * numOfCellsY)
      };
      while (snake.some((part) => part.x === food.x && part.y === food.y)){
        food = {

          x: Math.floor(Math.random() * numOfCellsX),
          y: Math.floor(Math.random() * numOfCellsY)
        };
      }

    } else {
      snake.pop();
    }
    
  }
 
  document.getElementById("score1").textContent = score;
  draw();
}
function showGameOverScreen() {
  clearInterval(gameInterval);

  gameOver = document.createElement("div");
  gameOver.style.position = "absolute";
  gameOver.style.top = "50%";
  gameOver.style.left = "50%";
  gameOver.style.transform = "translate(-50%, -50%)";
  gameOver.style.zIndex = "10";
  gameOver.style.height = window.innerHeight * 0.4 + "px";
  gameOver.style.width = window.innerWidth * 0.4 + "px";
  gameOver.style.backgroundColor = " rgb(238, 180, 130)";
  gameOver.style.color = "white";
  gameOver.style.fontSize = "2em";
  gameOver.style.borderRadius = "20px";
  gameOver.style.display = "flex";
  gameOver.style.flexDirection = "column";
  gameOver.style.justifyContent = "center";
  gameOver.style.alignItems = "center";
  gameOver.style.boxShadow="0px 0px 60px 210px rgb(238, 180, 130)"

  const msg = document.createElement("div");
  msg.textContent = "💀 Game Over 💀";

  const playAgainBtn = document.createElement("button");
  playAgainBtn.textContent = "🔁 Lets try again ";
  playAgainBtn.style.marginTop = "20px";
  playAgainBtn.style.padding = "10px 20px";
  playAgainBtn.style.fontSize = "1em";
  playAgainBtn.style.borderRadius = "10px";
  playAgainBtn.style.cursor = "pointer";
  playAgainBtn.style.color="white";
  playAgainBtn.style.backgroundColor="rgb(99, 180, 227)"
  playAgainBtn.onclick = startGame;

  gameOver.style.opacity = "0";
  gameOver.style.transition = "opacity 0.8s ease";
  setTimeout(() => {
  gameOver.style.opacity = "1";
  }, 50);


  gameOver.appendChild(msg);
  gameOver.appendChild(playAgainBtn);
  container.appendChild(gameOver);
}


function draw() {
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(board, 0, 0, canvas.width, canvas.height);
 // ציור הראש לפי כיוון בלבד
if (goX === 1) {
  ctx.drawImage(snakeHeadImage, snake[0].x * gridX, snake[0].y * gridY, gridX, gridY);
} else if (goX === -1) {
  ctx.drawImage(snakeHeadMirrorImage, snake[0].x * gridX, snake[0].y * gridY, gridX, gridY);
} else if (goY === -1) {
  ctx.save();
  ctx.translate((snake[0].x + 0.5) * gridX, (snake[0].y + 0.5) * gridY);
  ctx.rotate(-Math.PI / 2);
  ctx.drawImage(snakeHeadImage, -gridX / 2, -gridY / 2, gridX, gridY);
  ctx.restore();
} else if (goY === 1) {
  ctx.save();
  ctx.translate((snake[0].x + 0.5) * gridX, (snake[0].y + 0.5) * gridY);
  ctx.rotate(Math.PI / 2);
  ctx.drawImage(snakeHeadImage, -gridX / 2, -gridY / 2, gridX, gridY);
  ctx.restore();
} else {
  // אם לא זז בכלל (כלומר משחק רק התחיל)
  ctx.drawImage(snakeHeadImage, snake[0].x * gridX, snake[0].y * gridY, gridX, gridY);
}

  ctx.drawImage(snakeFoodImage, food.x * gridX, food.y * gridY, gridX*0.6, gridY*0.6);

  const tail=snake[snake.length-1];
  const beforeTail=snake[snake.length-2];

  if ((snake.length>1)&&(tail.y > beforeTail.y)){
    ctx.save();
    ctx.translate((tail.x + 0.5) * gridX, (tail.y + 0.5) * gridY);
    ctx.rotate(-Math.PI / 2);
    ctx.drawImage(snakeTailImage, -gridX / 2 - gridX * 0.1, -gridY / 2, gridX, gridY);
    ctx.restore();
  }
  else if ((snake.length>1)&&(tail.y < beforeTail.y)){
    ctx.save();
    ctx.translate((tail.x + 0.5) * gridX, (tail.y + 0.5) * gridY);
    ctx.rotate(Math.PI / 2);
    ctx.drawImage(snakeTailImage, -gridX / 2 - gridX * 0.1, -gridY / 2, gridX, gridY);
    ctx.restore();
  }
  else if((snake.length>1)&&(tail.x > beforeTail.x)){
  ctx.drawImage(snakeTailMirrorImage, snake[snake.length - 1].x * gridX, snake[snake.length - 1].y * gridY, gridX, gridY);
  }
  else if (snake.length!==1){
  ctx.drawImage(snakeTailImage, snake[snake.length - 1].x * gridX, snake[snake.length - 1].y * gridY, gridX, gridY);
  }
  

  const bodyScale = 0.80; // 80% מגודל התא
  const offset = (1 - bodyScale) / 2;
  
  for (let i = 1; i < snake.length - 1; i++) {
    const prev = snake[i - 1];
    const curr = snake[i];
  
    let x = curr.x * gridX;
    let y = curr.y * gridY;
  
    if (prev.y === curr.y) {
      // תנועה אופקית
      ctx.drawImage( snakeBodyImage,x + gridX * offset, y + gridY * offset,gridX * bodyScale,gridY * bodyScale);
    } else {
      // תנועה אנכית - עם סיבוב והקטנה
      ctx.save();
      ctx.translate((curr.x + 0.5) * gridX, (curr.y + 0.5) * gridY);
      ctx.rotate(prev.y > curr.y ? Math.PI / 2 : -Math.PI / 2);
      ctx.drawImage( snakeBodyImage,-gridX * bodyScale / 2,-gridY * bodyScale / 2,gridX * bodyScale,gridY * bodyScale);
      ctx.restore();
    }
  }
  
}

window.addEventListener("resize", () => {
  applyResponsiveStyles();
});

applyResponsiveStyles();

startGame();


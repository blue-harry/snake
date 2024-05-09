var blockSize = 25
var rows = 25
var cols = 25
var screen
var context
var snakeX = blockSize * 1
var snakeY = blockSize * 2
var snakeBody = []
var vely = 0
var velx = 0
var gameOver = false

window.onload = function () {
  screen = document.getElementById("board")
  screen.height = rows * blockSize
  screen.width = cols * blockSize
  context = screen.getContext("2d")
  placeApple()

  document.addEventListener("keydown", changeDirection)
  setInterval(update, 1000 / 5)
}

function update() {
  if (gameOver) {
    // game over
    context.fillText("GAME OVER!", 5, 90)
    context.fillStyle = "white"
    context.font = "32px sans-serif"
    context.fillText("press B to begin", 5, 150)

    return
  }

  context.fillStyle = "blue"
  context.fillRect(0, 0, screen.width, screen.height)

  context.fillStyle = "red"
  context.fillRect(appleX, appleY, blockSize, blockSize)

  if (snakeY == appleY && snakeX == appleX) {
    snakeBody.push([appleX, appleY])
    placeApple()
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1]
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY]
  }

  context.fillStyle = "yellow"
  snakeY += vely * blockSize
  snakeX += velx * blockSize
  context.fillRect(snakeX, snakeY, blockSize, blockSize)

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
  }

  //game over conditions
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true
    snakeX = blockSize * 1
    snakeY = blockSize * 2
    snakeBody = []
    vely = 0
    velx = 0
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true
      snakeX = blockSize * 1
      snakeY = blockSize * 2
      snakeBody = []
      vely = 0
      velx = 0
    }
  }
}
//
function changeDirection(e) {
  if (e.code == "ArrowUp" && vely != 1) {
    vely = -1
    velx = 0
  } else if (e.code == "ArrowDown" && vely != -1) {
    vely = 1
    velx = 0
  } else if (e.code == "ArrowLeft" && velx != 1) {
    vely = 0
    velx = -1
  }
  if (e.code == "ArrowRight" && velx != -1) {
    vely = 0
    velx = 1
  }

  if (e.code == "KeyB") {
    gameOver = false
  }
}
//
function placeApple() {
  appleX = Math.floor(Math.random() * cols) * blockSize
  appleY = Math.floor(Math.random() * rows) * blockSize
}

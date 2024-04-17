var blockSize = 25;
var rows = 25;
var cols = 25;
var screen;
var con;
var snakeX = blockSize * 1;
var snakeY = blockSize * 2;
var snakeBody = [];
var vely = 0;
var velx = 0;



window.onload = function () {
    screen = document.getElementById("board");
    screen.height = rows * blockSize;
    screen.width = cols * blockSize;
    context = screen.getContext("2d");
    placeApple();

    document.addEventListener("keydown", changeDirection);
    setInterval(update, 1000 / 10);
}


function update() {
    context.fillStyle = "blue";
    context.fillRect(0, 0, screen.width, screen.height);


    context.fillStyle = "red";
    context.fillRect(appleX, appleY, blockSize, blockSize);

    if (snakeY == appleY && snakeX == appleX) {
        snakeBody.push([appleX, appleY])
        placeApple();
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }


    context.fillStyle = "yellow";
    snakeY += vely * blockSize;
    snakeX += velx * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

}
//
function changeDirection(e) {
    if (e.code == 'ArrowUp' && vely != 1) {
        vely = -1;
        velx = 0;
    }
    else if (e.code == 'ArrowDown' && vely != -1) {
        vely = 1;
        velx = 0;
    }
    else if (e.code == 'ArrowLeft' && velx != 1) {
        vely = 0;
        velx = -1;
    } if (e.code == 'ArrowRight' && velx != -1) {
        vely = 0;
        velx = 1;
    }
}
//
function placeApple() {
    appleX = Math.floor(Math.random() * cols) * blockSize;
    appleY = Math.floor(Math.random() * rows) * blockSize;
}
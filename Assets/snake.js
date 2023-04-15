const playBoard = document.querySelector(".board")

let GameOver = false;
let score = 0
let foodX, foodY;
let snakeHeadX = Math.floor(Math.random() * 30) + 1, snakeHeadY = Math.floor(Math.random() * 30) + 1;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let interval

document.querySelector(".high-score p").innerHTML = localStorage.getItem("HighScore")

const changeSnakeDirection = (KeyEvent) => {
    switch (KeyEvent.key) {
        case "ArrowDown":
            if (velocityY != 1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case "ArrowUp":
            if (velocityY != -1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case "ArrowLeft":
            if (velocityX != -1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case "ArrowRight":
            if (velocityX != 1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;

        default:
            break;
    }
}

const respawnFood = () => {
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
}
const initGame = () => {
    if (GameOver == true) {
        clearInterval(interval)
        alert("Game Over press ok to try again")
        location.reload()
        if (score > localStorage.getItem("HighScore")) {
            localStorage.setItem("HighScore", JSON.stringify(score))
        }
    }



    document.querySelector(".score p").innerHTML = score

    if (score > localStorage.getItem("HighScore")) {
        document.querySelector(".score p").style.color = "#2add81"
    }

    let htmlMarkup = `<div class="apple" style="grid-area:${foodY}/${foodX};"></div>`

    if (snakeHeadX === foodX && snakeHeadY === foodY) {
        score += 1
        respawnFood()
        snakeBody.push([foodX, foodY])
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeHeadX, snakeHeadY]

    snakeHeadX += velocityX;
    snakeHeadY += velocityY;

    if (snakeHeadX < 0 || snakeHeadX > 30 || snakeHeadY < 0 || snakeHeadY > 30) {
        GameOver = true
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`
        if (i != 0 && snakeBody[0][1] == snakeBody[i][1] && snakeBody[0][0] == snakeBody[i][0]) {
            GameOver = true
        }
    }

    playBoard.innerHTML = `${htmlMarkup}`;
}
respawnFood();
interval = setInterval(initGame, 125)

document.addEventListener("keydown", changeSnakeDirection)
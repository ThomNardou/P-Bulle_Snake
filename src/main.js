import '../css/style.css';
import Snake from '../src/snake';
import Apple from './apple';

let allSnakes = [];
let appleList = [];

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const VALUE_TO_UPDATE = 100;
const gradient = ctx.createLinearGradient(0, 0, 800, 170);

let hasSpawn = false
let isDead = false
let partSnakSpawned = false 
let firstTime = true;

let score = 0;
let framNumber = 0;

gradient.addColorStop(0, "black");
gradient.addColorStop(1, "grey");

allSnakes.push(new Snake(0,0));

let direction;

window.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowDown":
      direction = 'd'
      break;
    case "ArrowUp":
      direction = 'u'
      break;
    case "ArrowLeft":
      direction = 'l'
      break;
    case "ArrowRight":
      direction = 'r'
      break;
    case "e":
      addSnake();
      break;
  }
});

window.addEventListener("load", event => {
  // let pseudo = prompt("What is you player name ? ", "User");
  const audio = document.querySelector("audio");
  audio.volume = 0.2;
  audio.play();
});

const move = () => {

    document.getElementById("score").innerHTML = "Score : " + score;

    if (allSnakes[allSnakes.length - 1].getCoorX() > 700 || allSnakes[allSnakes.length - 1].getCoorY() > 700 || allSnakes[allSnakes.length - 1].getCoorX() < 0 || allSnakes[allSnakes.length - 1].getCoorY() < 0) {
      isDead = true
    }

    if (!partSnakSpawned) {
      allSnakes.forEach((element, index) => {
        if (index != allSnakes.length - 1) {
          if (allSnakes[allSnakes.length - 1].getCoorX() == allSnakes[index].getCoorX() && allSnakes[allSnakes.length - 1].getCoorY() == allSnakes[index].getCoorY()) {
            isDead = true;
          }
        }
      });
    }
  
    if(!isDead) {
      if (framNumber % 7 == 0) {
      
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 800, 800);
    
        drawSnake();
        moveSnake();
        partSnakSpawned = false

        if (direction != null) spawnApple();
    
        if (allSnakes[allSnakes.length - 1].getCoorX() == appleList[0].getCoorX() * 100 && allSnakes[allSnakes.length - 1].getCoorY() == appleList[0].getCoorY() * 100) {
          addSnake();
          score += 1;
          appleList.splice(0, 1);
        }
      }
    }

    else {
      let GameOverTitle = document.querySelector('.GameOver');

      if (firstTime) GameOverTitle.textContent = "GameOver !";

      setTimeout(function() {
        GameOverTitle.style.fontSize = "30px";
        GameOverTitle.textContent = "Vous allez etre rediriger"
        firstTime = false
      }, 3000);

      setTimeout(function() {
        window.location.replace("../index.html"); 
      }, 6000);
    }

    framNumber += 1;
    console.log(framNumber);
};

setInterval(move, 30);

function spawnApple() {

  let randCooryY = Math.floor(Math.random() * 8);
  let randCooryX = Math.floor(Math.random() * 8);

  appleList.push(new Apple(randCooryX, randCooryY)); 

  ctx.fillStyle = 'orange'
  ctx.fillRect(appleList[0].getCoorX() * 100, appleList[0].getCoorY() * 100, VALUE_TO_UPDATE, VALUE_TO_UPDATE);
  hasSpawn = true;
}

function addSnake() {
  allSnakes.push(new Snake(allSnakes[allSnakes.length - 1].getCoorX(), allSnakes[allSnakes.length - 1].getCoorY()))
  partSnakSpawned = true
}

function drawSnake() {

  allSnakes.forEach((element) => {
    if(element ==  allSnakes[allSnakes.length - 1]) {
        ctx.fillStyle = 'red'
    }
    else {
      ctx.fillStyle = 'yellow'
    }
    ctx.fillRect(element.getCoorX(), element.getCoorY(), VALUE_TO_UPDATE, VALUE_TO_UPDATE);
  });
}

function moveSnake() {
    let y = allSnakes[allSnakes.length - 1].getCoorY();
    let x = allSnakes[allSnakes.length - 1].getCoorX();

    
    if (direction == 'd') {
      y += VALUE_TO_UPDATE;
    }

    else if (direction == 'u') {
      y -= VALUE_TO_UPDATE;
    }
    
    else if (direction == 'r') {
      x += VALUE_TO_UPDATE;
    }
    
    else if (direction == 'l') {
      x -= VALUE_TO_UPDATE;
    }

    if(direction == 'd' || direction == 'u' || direction == 'r' || direction == 'l') {
      allSnakes.push(new Snake(x,y));
      allSnakes.shift();
    }

}
import '../css/style.css';
import Snake from '../src/snake';
import Apple from './apple';

let allSnakes = [];
let appleList = [];

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const VALUE_TO_UPDATE = 100;
const gradient = ctx.createLinearGradient(0, 0, 800, 170);

let snakeLength = 1
let hasSpawn = false

gradient.addColorStop(0, "black");
gradient.addColorStop(1, "grey");

allSnakes.push(new Snake(0,0));

let direction;

window.addEventListener("keydown", event => {
  console.log(event.key);
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
      console.log(snakeLength);
      break;
  }
});

const move = () => {

  // Dessine la grille de jeu
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 800, 800);

  drawSnake();
  moveSnake();
  spawnApple();

};

setInterval(move, 300);

function spawnApple() {

  let randCooryY = Math.floor(Math.random() * 10);
  let randCooryX = Math.floor(Math.random() * 10);
 appleList.push(new Apple(randCooryX, randCooryY)); 

  ctx.fillStyle = 'orange'
  ctx.fillRect(appleList[0].getCoorX() * 100, appleList[0].getCoorY() * 100, VALUE_TO_UPDATE, VALUE_TO_UPDATE);
  hasSpawn = true;
  console.log(hasSpawn);
}

function addSnake() {
  allSnakes.push(new Snake(allSnakes[allSnakes.length - 1].getCoorX(), allSnakes[allSnakes.length - 1].getCoorY()))
}

function drawSnake() {
  ctx.fillStyle = 'red';
  for(let i = 0; i < allSnakes.length; i++) {
    ctx.fillRect(allSnakes[i].getCoorX(), allSnakes[i].getCoorY(), VALUE_TO_UPDATE, VALUE_TO_UPDATE);
  }
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

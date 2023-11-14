import '../css/style.css';
import Snake from '../src/snake';

let allSnakes = [];

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const VALUE_TO_UPDATE = 50;
let snakeLength = 1

const gradient = ctx.createLinearGradient(0, 0, 800, 170);

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
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 800);

  drawSnake();
  moveSnake();

};

setInterval(move, 300);


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

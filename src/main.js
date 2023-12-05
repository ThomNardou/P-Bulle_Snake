import '../css/style.css';
import Snake from '../src/snake';
import Apple from './apple';

let allSnakes = [];                                         // Contient toutes les partie du serpent

const canvas = document.querySelector('canvas');            // Prends l'élement Canvas dans le HTML
const ctx = canvas.getContext('2d');                        // Dis que le canva est en 2D

const OBJECT_WIDTH = 100;                                   // Taille des objets dans le canva
const FRAME = 2;                                            // Nombre de Frame que le veux faire une action 
                   
let isDead = false                                          // Indique si le joueur est vivant ou pas
let partSnakSpawned = false                                 // Indique si une partie du serpent est entrain d'apparaitre
let firstTime = true;                                       // Evite que le message de Game Overs d'affiche plein de fois 
let hasBeenEat = true                                       // Indique si une pomme a été mangé ou pas

let score = 0;                                              // Score du joueur 
let framNumber = 0;                                         // Indique le nombre de fram en cours

let apple;                                                  // Pomme du jeu
let direction;                                              // direction dans laquelle le serpent doit aller 

// Ajoute la tête du serpent
allSnakes.push(new Snake(0,0));       

const move = () => {
  
  // Permet d'afficher le score du joueur
  document.getElementById("score").innerHTML = "Score : " + score;
  
  // regarde si il y a eu une collision avec les bords du jeu
  checkCollision();

  // Regarde si le serpent s'est cogné avec lui même 
  checkSnakeCollision();
  
  // Regarde si le joueur est mort si il l'est pas et que le nombre de frame actuel est un multiple de FRAME alors il dessine l'air de jeu sinon si il est mort 
  // Cela va afficher le message de mort
  !isDead ? framNumber % FRAME == 0 ? gameDraw() : undefined : loseDraw();

  // Augmente le nombre de frame
  framNumber += 1;
};
setInterval(move, 100);

function spawnApple() {

  let randCooryY = 0;               // Coordonnée X de la pomme
  let randCooryX = 0;               // Coordonnée Y de la pomme

  let appleCanSpawn = true;         // Indique si la pomme peut apparaitre ou pas 
  

  do {
    // Génère un chiffre aléatoire entre 0 et 8
    randCooryY = Math.floor(Math.random() * 8);
    randCooryX = Math.floor(Math.random() * 8);

    // Regarde si les coordonnées de la pomme ne sont pas égal à une partie du serpent 
    allSnakes.some((n1)=>(n1.getCoorX() === randCooryX * 100 && n1.getCoorY() === randCooryY * 100)) ? appleCanSpawn = false : appleCanSpawn = true;

  }
  while(!appleCanSpawn);

  // Crée la nouvelle pomme
  apple = new Apple(randCooryX, randCooryY);  

  // dis que cette pomme n'a pas été mangé
  hasBeenEat = false;
}

// Dessine la pomme
function drawApple() {
  ctx.fillStyle = 'orange'
  ctx.fillRect(apple.getCoorX() * 100, apple.getCoorY() * 100, OBJECT_WIDTH, OBJECT_WIDTH);
}

// Ajoute une nouvelle partie au serpent
function addSnake() {
  allSnakes.push(new Snake(allSnakes[allSnakes.length - 1].getCoorX(), allSnakes[allSnakes.length - 1].getCoorY()))
  partSnakSpawned = true
}

// dessine le serpent
function drawSnake() {
  
  allSnakes.forEach((element) => {

    element == allSnakes[allSnakes.length - 1] ? ctx.fillStyle = 'red' : ctx.fillStyle = '#B44C43'

    ctx.fillRect(element.getCoorX(), element.getCoorY(), OBJECT_WIDTH, OBJECT_WIDTH);
  });
}

// Fais bouger le serpent
function moveSnake() {
  let y = allSnakes[allSnakes.length - 1].getCoorY();
  let x = allSnakes[allSnakes.length - 1].getCoorX();
  
  switch(direction) {
    case 'd':
      y += OBJECT_WIDTH;
      break;
    
    case 'u':
      y -= OBJECT_WIDTH;
      break;
      
    case 'r':
      x += OBJECT_WIDTH;
      break;

    case 'l':
      x -= OBJECT_WIDTH;
      break;
  }

  // Va Supprimer la dernière partie du serpent et va la mettre devant la tête
  direction == 'd' || direction == 'u' || direction == 'r' || direction == 'l' ? (allSnakes.push(new Snake(x,y)), allSnakes.shift()) : undefined;
  
}

// Regarde si le serpent ne se cogne pas contre lui même 
function checkSnakeCollision() {
  !partSnakSpawned ? allSnakes.forEach((element, index) => {

    index != allSnakes.length - 1 && allSnakes[allSnakes.length - 1].getCoorX() == allSnakes[index].getCoorX() && 
    allSnakes[allSnakes.length - 1].getCoorY() == allSnakes[index].getCoorY()
    ? isDead = true : isDead;
    
  }) : undefined;
}

// regarde si il y a eu une collision avec les bords du jeu
function checkCollision() {
  allSnakes[allSnakes.length - 1].getCoorX() > 700 || 
  allSnakes[allSnakes.length - 1].getCoorY() > 700 || 
  allSnakes[allSnakes.length - 1].getCoorX() < 0 || 
  allSnakes[allSnakes.length - 1].getCoorY() < 0 ? isDead = true : isDead;
}

// Dessine l'air de jeu 
function gameDraw() {
  
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 800, 800);

  drawSnake();
  moveSnake();
  partSnakSpawned = false;

  hasBeenEat ? spawnApple() : undefined;

  drawApple();
  
  // Regarde si le serpent à mangé un pomme
  allSnakes[allSnakes.length - 1].getCoorX() == apple.getCoorX() * 100 && allSnakes[allSnakes.length - 1].getCoorY() == apple.getCoorY() * 100 ? 
  (addSnake(), score += 1, hasBeenEat = true) : undefined;
}

// Affiche l'écran de défaite
function loseDraw() {
  let GameOverTitle = document.querySelector('.GameOver');
  
  firstTime ? GameOverTitle.textContent = "GameOver !" : undefined;

  setTimeout(function() {
    GameOverTitle.style.fontSize = "30px";
    GameOverTitle.textContent = "Vous allez etre rediriger"
    firstTime = false
  }, 2000);

  setTimeout(function() {
    window.location.replace("../index.html"); 
  }, 5000);
}

// Vérifie quelle touche l'utilisateur à appuyé
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

// S'execute quand la page est load 
window.addEventListener("load", event => {
  // let pseudo = prompt("What is you player name ? ", "User");
  const audio = document.querySelector("audio");
  audio.volume = 0.2;
  audio.play();
});
import '../css/style.css';
import Snake from '../src/snake'


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const move = () => {

  // Dessine la grille de jeu
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 800, 800);

  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, 300, 100);

  // Rafraichit à chaque seconde
  setTimeout(() => {
    requestAnimationFrame(move);
  }, 1000);
  
};

requestAnimationFrame(move);


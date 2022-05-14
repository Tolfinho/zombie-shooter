const hero = document.querySelector('.hero');
const scope = document.querySelector('.scope');
let gameStarted = false;

let zombieCount = 0;
let speed = 1500;

const life = document.querySelector('.life');
let zombieDestroyed = false;
let lifeCollected = false;
let lifes = 6;
life.innerHTML = lifes;

hero.addEventListener('mousemove', (e) => {
  scope.style.left = e.pageX + 'px';
  scope.style.top = e.pageY + 'px';
});
hero.addEventListener('click', loseLife);

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (key === 'Escape') {
    telaInicio.style.display = 'flex';
    hero.style.display = 'none';
    gameStarted = false;
  }

  //console.log(e.key)
});

const telaInicio = document.querySelector('.tela-inicio');
const playButton = document.querySelector('.play');
playButton.addEventListener('click', () => {
  if (gameStarted === false) {
    telaInicio.style.display = 'none';
    hero.style.display = 'block';
    gameStarted = true;
  }
});

const zombies = document.querySelector('.zombies');
const width = window.innerWidth;
const height = window.innerHeight;

const score = document.querySelector('.score');
let points = 0;
score.innerHTML = points;

/* cria o elemento 'zombie' em uma posição aleatória da tela */
function createZombie() {
  if (gameStarted) {
    const zombie = document.createElement('img');
    let left = parseInt(Math.random() * (width - 130 - 1) + 1);
    let top = parseInt(Math.random() * (height - 130 - 200) + 200);
    zombie.setAttribute('src', 'img/zombie.png');
    zombie.setAttribute('class', 'zombie');
    zombie.setAttribute('draggable', 'false');
    zombie.setAttribute('onclick', 'destroyZombie(this)');
    zombie.style.left = left + 'px';
    zombie.style.top = top + 'px';
    zombies.appendChild(zombie);

    zombieCount++;
    //console.log(zombieCount)
    if (zombieCount >= 10) {
      telaInicio.style.display = 'flex';
      hero.style.display = 'none';
      gameStarted = false;
      restartGame();
    }
  }
}

/* cria o elemento 'life potion' em uma posição aleatória da tela */
function createLife() {
  if (gameStarted) {
    const lifePotion = document.createElement('img');
    let leftLP = parseInt(Math.random() * (width - 130 - 1) + 1);
    let topLP = parseInt(Math.random() * (height - 130 - 200) + 200);
    lifePotion.setAttribute('src', 'img/heart.png');
    lifePotion.setAttribute('class', 'lp');
    lifePotion.setAttribute('draggable', 'false');
    lifePotion.setAttribute('onclick', 'collectLP(this)');
    lifePotion.style.left = leftLP + 'p x';
    lifePotion.style.top = topLP + 'px';
    zombies.appendChild(lifePotion);
  }
}

/* spaw de zumbi a cada x segundos */
setInterval(createZombie, speed);

/* spaw uma poção de vida a cada x segundos */
setInterval(createLife, 10000);

/* destrio o zumbi que recebe o tiro */
/* aumenta 1 ponto pro usuário */
/* 'zombieDestroyed' indica que o usuário acertou o zumbi, por isso não deve perder vida */
function destroyZombie(zombie) {
  zombie.remove();
  points++;
  score.innerHTML = points;
  zombieDestroyed = true;

  zombieCount--;
}

function collectLP(lp) {
  lp.remove();
  lifes++;
  life.innerHTML = lifes;
  lifeCollected = true;
}

/* testa se o usuário clicou em um zumbi, senão significa que errou o tiro, então deve perder uma vida */
/* caso não tenha mais vidas aparece a tela de Game Over */
function loseLife() {
  if (!zombieDestroyed && !lifeCollected) {
    lifes--;
    life.innerHTML = lifes;
    if (lifes == 0) {
      telaInicio.style.display = 'flex';
      hero.style.display = 'none';
      restartGame();
    }
    //console.log(lifes)
  }
  zombieDestroyed = false;
  lifeCollected = false;
}

/* reseta todas as variáveis para o valor default */
function restartGame() {
  while (zombies.firstChild) {
    zombies.removeChild(zombies.firstChild);
  }
  zombieCount = 0;
  zombieDestroyed = false;
  lifeCollected = false;
  gameStarted = false;
  points = 0;
  lifes = 6;
  speed = 1500;
  score.innerHTML = points;
  life.innerHTML = lifes;
  console.log('jogo reiniciado');
}

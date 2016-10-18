const GameView = require('./gameview');
const GameMap = require("./gamemap");

const gameMenu = new Image();
gameMenu.src = './img/menu.png';

const menuMusic = new Audio();
menuMusic.src = './sounds/goonies-wiseman.mp3';
menuMusic.volume = 0.5;

const startGame = function () {
  let canvasEl = document.getElementsByTagName("canvas")[0];

  canvasEl.width = GameMap.DIM_X;
  canvasEl.height = GameMap.DIM_Y;

  let ctx = canvasEl.getContext("2d");

  gameMenu.onload = () => {
    ctx.drawImage(gameMenu, 0, 0, 272, 228, 0, 0, 272, 228);
  };

  let soundOn = true;
  menuMusic.loop = true;
  menuMusic.play();
  var map, view;

  document.onkeydown = (e) =>{

    if (e.key === 'm') {
      menuMusic.pause();
      map = new GameMap(soundOn, 4, startGame);
      view = new GameView(ctx, map, true);
      view.start();
    }
    if (e.key === 'n') {
      menuMusic.pause();
      map = new GameMap(soundOn, 4);
      view = new GameView(ctx, map);
      view.start();
    }

    if (e.key === 't') {
      if (menuMusic.paused) {
        soundOn = true;
        menuMusic.play();
      } else {
        soundOn = false;
        menuMusic.pause();
      }
    }
  };
};

document.addEventListener("DOMContentLoaded", function(){
  startGame();
});

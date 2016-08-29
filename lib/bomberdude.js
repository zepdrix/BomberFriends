const GameView = require('./gameview');
const GameMap = require("./gamemap");
const gameMenu = new Image();
gameMenu.src = './img/menu.png';

const menuMusic = new Audio();
menuMusic.src = './sounds/goonies-wiseman.mp3';

document.addEventListener("DOMContentLoaded", function(){
  let canvasEl = document.getElementsByTagName("canvas")[0];

  canvasEl.width = GameMap.DIM_X;
  canvasEl.height = GameMap.DIM_Y;

  let ctx = canvasEl.getContext("2d");
  gameMenu.onload =  () => {
    ctx.drawImage(gameMenu, 0, 0, 272, 228, 0, 0, 272, 228);
  };

  menuMusic.loop = true;
  menuMusic.play();
  var map, view;
  document.onkeydown = (e) =>{
    if (e.key === 'm') {
      menuMusic.pause();
      map = new GameMap(2);
      view = new GameView(ctx, map, true);
      view.start();
    }
    if (e.key === 'n') {
      menuMusic.pause();

      map = new GameMap(2);
      view = new GameView(ctx, map);
      view.start();
    }

    if (e.key === 't') {
      if (menuMusic.paused) {
        menuMusic.play();
      } else {
        menuMusic.pause();
      }
    }

  };



});

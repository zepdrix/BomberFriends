const GameView = require('./gameview');
const GameMap = require("./gamemap");
const gameMenu = new Image();
gameMenu.src = './img/menu.png';

document.addEventListener("DOMContentLoaded", function(){
  let canvasEl = document.getElementsByTagName("canvas")[0];

  canvasEl.width = GameMap.DIM_X;
  canvasEl.height = GameMap.DIM_Y;

  let ctx = canvasEl.getContext("2d");
  gameMenu.onload =  () => {
    ctx.drawImage(gameMenu, 0, 0, 272, 228, 0, 0, 272, 213);
  };

  document.onkeydown = (e) =>{
    if (e.keyCode === 13) {
      var map = new GameMap(ctx);
      var view = new GameView(ctx, map);
      view.start();
    }
  };



});

const Game = require("./game");
const GameView = require('./gameview');
const GameMap = require("./gamemap");
var canvasEl;
var ctx;

document.addEventListener("DOMContentLoaded", function(){

  canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = GameMap.DIM_X;
  canvasEl.height = GameMap.DIM_Y;
  
  ctx = canvasEl.getContext("2d");
  var map = new GameMap(ctx);
  var view = new GameView(ctx, map);
  view.start();

});

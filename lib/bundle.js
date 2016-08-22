/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(2);
	const GameMap = __webpack_require__(3);
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	
	
	
	}
	
	Game.DIM_X = 1200;
	Game.DIM_Y = 900;
	Game.FPS = 32;
	Game.BG_COLOR = "#CCCCCC";
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var GameView = function (context, gameMap) {
	  this.context = context;
	  this.gameMap = gameMap;
	  this.character1 = this.gameMap.addCharacter1();
	  this.character2 = this.gameMap.addCharacter2();
	};
	
	GameView.prototype.bindKeyHandlers = function (character, character2) {
	  onkeydown = function (e) {
	    if (e.key ==='v') {
	      character.dropBomb();
	    }
	
	    if (e.key === 'w') {
	      character.moveUp();
	    }
	
	    if (e.key === 's') {
	      character.moveDown();
	    }
	
	    if (e.key === 'd') {
	      character.moveRight();
	    }
	
	    if (e.key === 'a') {
	      character.moveLeft();
	    }
	    if (e.key ==='p') {
	      character2.dropBomb();
	    }
	
	    if (e.key === 'i') {
	      character2.moveUp();
	    }
	
	    if (e.key === 'k') {
	      character2.moveDown();
	    }
	
	    if (e.key === 'l') {
	      character2.moveRight();
	    }
	
	    if (e.key === 'j') {
	      character2.moveLeft();
	    }
	
	  };
	  onkeyup = function (e) {
	    // if (e.key === 'a' || e.key === 'd') {
	    //   character.move([0,0]);
	    // }
	    if (e.key === 'w') {
	      character.stopMoveUp();
	    }
	    if (e.key === 's') {
	      character.stopMoveDown();
	    }
	    if (e.key === 'd') {
	      character.stopMoveRight();
	    }
	    if (e.key === 'a') {
	      character.stopMoveLeft();
	    }
	
	    if (e.key === 'i') {
	      character2.stopMoveUp();
	    }
	    if (e.key === 'k') {
	      character2.stopMoveDown();
	    }
	    if (e.key === 'l') {
	      character2.stopMoveRight();
	    }
	
	    if (e.key === 'j') {
	      character2.stopMoveLeft();
	    }
	
	  };
	};
	
	
	GameView.prototype.start = function () {
	  this.bindKeyHandlers(this.character1, this.character2);
	
	  this.lastTime = 0;
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	GameView.prototype.animate = function (time) {
	  const timeDelta = time - this.lastTime;
	  this.gameMap.step(timeDelta);
	  this.gameMap.drawFrame(this.context);
	  this.lastTime = time;
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	
	
	GameView.MOVES1 = {
	  "w": [ 0, -1],
	  "a": [-1,  0],
	  "s": [ 0,  1],
	  "d": [ 1,  0],
	  "v": 'bomb',
	};
	
	GameView.MOVES2 = {
	  "i": [ 0, -1],
	  "j": [-1,  0],
	  "k": [ 0,  1],
	  "l": [ 1,  0],
	  "p": 'bomb'
	};
	
	module.exports = GameView;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Tile = __webpack_require__(4);
	const Flame = __webpack_require__(5);
	const Character = __webpack_require__(6);
	var bombImage = new Image();
	bombImage.src = './img/bomb.png';
	var bomber = new Image();
	bomber.src = './img/bomber.gif';
	var bomber2 = new Image();
	bomber2.src = './img/bomber2.gif';
	var tile = new Image();
	tile.src = './img/tile.png';
	var wall = new Image();
	wall.src = './img/wall.png';
	var flameImage = new Image();
	flameImage.src = './img/flame.gif';
	var blockImage = new Image();
	blockImage.src = './img/block.png';
	var flamePowerup = new Image();
	flamePowerup.src = './img/flamePowerup.png';
	
	
	var GameMap = function () {
	  this.tiles = [];
	  this.characters = [];
	  this.tileSize = 16;
	  this.initialize();
	  this.generateBlocks();
	  this.bombs = [];
	  this.flames = [];
	  this.powerups = [];
	};
	
	GameMap.DIM_X = 1200;
	
	GameMap.DIM_Y = 900;
	
	GameMap.prototype.initialize = function () {
	  for (var i = 0; i < 13; i++) {
	    this.tiles.push([]);
	    for (var j = 0; j < 17; j++) {
	      if (i === 0 || j === 0 || i === 12 || j === 16) {
	
	        let wallTile = new Tile([j, i], 'wall');
	        this.tiles[i].push(wallTile);
	      } else if (i % 2 === 0 && j % 2 === 0) {
	
	        let wallTile = new Tile([j, i], 'wall');
	        this.tiles[i].push(wallTile);
	      } else {
	
	        let pathTile = new Tile([j, i]);
	        this.tiles[i].push(pathTile);
	      }
	
	    }
	  }
	};
	
	GameMap.prototype.step = function () {
	  this.characters.forEach( (character) => {
	    character.move();
	    // character.moveDown();
	  });
	};
	
	GameMap.prototype.addCharacter1 = function () {
	  var character1 = new Character([16, 16], this, 1);
	  this.characters.push(character1);
	  return character1;
	};
	
	GameMap.prototype.addCharacter2 = function () {
	  var character2 = new Character([240, 16], this, 2);
	  this.characters.push(character2);
	  return character2;
	};
	
	GameMap.prototype.addBomb = function (bomb) {
	  this.bombs.push(bomb);
	  console.log(this.bombs);
	};
	
	GameMap.prototype.renderBombs = function (ctx) {
	  this.bombs.forEach( (bomb, index) => {
	    if (bomb.time <= bomb.explodeTime) {
	      ctx.drawImage(bombImage, bomb.mapPos[0] * this.tileSize, bomb.mapPos[1] * this.tileSize);
	    } else {
	      this.removeBomb(index);
	    }
	  });
	};
	
	GameMap.prototype.renderFlames = function (ctx) {
	  this.flames.forEach( (flame, index) => {
	    if (flame.time <= flame.extinguishTime) {
	      ctx.drawImage(flameImage, flame.mapPos[0] * this.tileSize, flame.mapPos[1] * this.tileSize);
	    } else {
	      this.removeFlame(index);
	    }
	  });
	};
	
	GameMap.prototype.removeBomb = function (index) {
	  this.bombs[index].explode();
	  this.bombs.splice(index, 1);
	  console.log(this.bombs);
	};
	
	GameMap.prototype.renderMap = function (ctx) {
	  var size = 16;
	  let xCoord = 0;
	  let yCoord = 0;
	
	  for (var i = 0; i < this.tiles.length; i++) {
	    for (var j = 0; j < this.tiles[1].length; j++) {
	      if (this.tiles[i][j].type === 'wall') {
	        ctx.drawImage(wall, xCoord, yCoord);
	      } else if (this.tiles[i][j].type === 'block') {
	        ctx.drawImage(blockImage, xCoord, yCoord);
	      } else if (this.tiles[i][j].powerup === 'flame') {
	        ctx.drawImage(flamePowerup, xCoord, yCoord);
	      } else {
	        ctx.drawImage(tile, xCoord, yCoord);
	      }
	      xCoord += size;
	    }
	    yCoord += size;
	    xCoord = 0;
	  }
	};
	
	GameMap.prototype.isPath = function (pos) {
	  if (this.tiles[pos[0]][pos[1]].type === 'path') {
	    return true;
	  } else {
	    return false;
	  }
	};
	
	GameMap.prototype.isUnsafe = function (pos) {
	  return !this.tiles[pos[0]][pos[1]].safe;
	};
	
	GameMap.prototype.isBomb = function (pos) {
	  let posX = pos[0];
	  let posY = pos[1];
	  let isBomb;
	  this.bombs.forEach( (bomb, index) => {
	    let bombX = bomb.mapPos[0];
	    let bombY = bomb.mapPos[1];
	    if (posX === bombX && posY === bombY) {
	      isBomb = index;
	    }
	  });
	  return isBomb;
	};
	
	GameMap.prototype.isBlock = function (pos) {
	  return this.tiles[pos[0]][pos[1]].type === 'block';
	};
	
	GameMap.prototype.destroyBlock = function (pos) {
	  this.tiles[pos[0]][pos[1]].type = 'path';
	};
	
	
	GameMap.prototype.isLeftPathUnsafe = function (character) {
	  let mapLeftX = Math.floor((character.pos[0] - 1) / this.tileSize);
	  let mapY = Math.floor((character.pos[1] + (this.tileSize / 2)) / this.tileSize);
	  return this.isUnsafe([mapY, mapLeftX]);
	};
	
	GameMap.prototype.isRightPathUnsafe = function (character) {
	  let mapRightX = Math.floor((character.pos[0] + 1) / this.tileSize) + 1;
	  let mapY = Math.floor((character.pos[1] + (this.tileSize / 2)) / this.tileSize);
	  return this.isUnsafe([mapY, mapRightX]);
	};
	
	GameMap.prototype.isTopPathUnsafe = function (character) {
	  let mapX = Math.floor((character.pos[0] + (this.tileSize / 2)) / this.tileSize - 1) ;
	  let mapTopY = Math.floor((character.pos[1] - 1) / this.tileSize);
	  return this.isUnsafe([mapTopY, mapX]);
	};
	
	GameMap.prototype.isBottomPathUnsafe = function (character) {
	  let mapX = Math.floor((character.pos[0] + (this.tileSize / 2)) / this.tileSize);
	  let mapBottomY = Math.floor((character.pos[1] ) / this.tileSize) + 1;
	  return this.isUnsafe([mapBottomY, mapX]);
	};
	
	
	
	GameMap.prototype.renderCharacters = function (ctx) {
	  for (var i = 0; i < this.characters.length; i++) {
	    if (this.characters[i].playerNum === 1) {
	      ctx.drawImage(bomber, this.characters[i].pos[0], this.characters[i].pos[1]-12);
	    } else if (this.characters[i].playerNum === 2) {
	      ctx.drawImage(bomber, this.characters[i].pos[0], this.characters[i].pos[1]-12);
	    }
	  }
	};
	
	GameMap.prototype.makeFlame = function (pos) {
	  let gameTile = this.tiles[pos[1]][pos[0]];
	  gameTile.safe = false;
	  // console.log('makeflame');
	  // console.log(this.isBomb(pos));
	  // let id = this.isBomb(pos);
	  // if (this.isBomb(pos) > -1 && this.bombs[id]) {
	  //   setTimeout(this.removeBomb(id), 200);
	  // }
	
	  if (gameTile.type === 'block') {
	    if (gameTile.powerup === null) {
	      gameTile.type = 'path';
	    } else if (gameTile.type === 'flame') {
	
	    } else if (gameTile.type === 'bomb') {
	
	    }
	  } else if (gameTile.type === 'path' && gameTile.powerup !== null) {
	
	    console.log('destroy powerup');
	  }
	
	  let flame = new Flame(pos, this);
	  this.flames.push(flame);
	};
	
	GameMap.prototype.removeFlame = function (index) {
	  this.flames[index].extinguish();
	  this.tiles[this.flames[index].mapPos[1]][this.flames[index].mapPos[0]].safe = true;
	  this.flames.splice(index, 1);
	};
	
	GameMap.prototype.checkCharacter = function () {
	  this.characters.forEach( (character, index) => {
	    if (this.isTopPathUnsafe(character) || this.isRightPathUnsafe(character) ||
	    this.isBottomPathUnsafe(character) || this.isLeftPathUnsafe(character)) {
	      this.removeCharacter(index);
	    }
	    if (this.isTouchingPowerup(character, index)) {
	      this.removePowerup(index);
	    }
	  });
	};
	
	GameMap.prototype.removePowerup = function (index, pos = null) {
	  if (pos) {
	
	  }
	};
	
	GameMap.prototype.isTouchingPowerup = function (character) {
	
	};
	
	GameMap.prototype.removeCharacter = function (index) {
	  let character = this.characters[index];
	  if (character.lives > 0) {
	    character.lives -= 1;
	    this.respawnCharacter(character, index);
	  } else {
	
	    this.characters.splice(index, 1);
	  }
	};
	
	GameMap.prototype.respawnCharacter  = function (character, index) {
	  this.characters.splice(index, 1);
	  setTimeout( () => {
	    this.characters.push(character);
	  }, 1000);
	};
	
	GameMap.prototype.drawFrame = function (ctx) {
	  ctx.clearRect(0, 0, GameMap.DIM_X, GameMap.DIM_Y);
	  this.checkCharacter();
	  this.renderMap(ctx);
	  this.renderBombs(ctx);
	  this.renderFlames(ctx);
	  this.renderCharacters(ctx);
	};
	
	GameMap.prototype.generateBlocks = function () {
	  for (var i = 0; i < this.tiles.length; i++) {
	    for (var j = 0; j < this.tiles[i].length; j++) {
	      if ((i < 3 && j < 3) || (j > 13 && i < 3)) {
	        continue;
	      } else if (this.tiles[i][j].type === 'path' && Math.random() < 0.5){
	        this.tiles[i][j].type = 'block';
	        let randomNum = Math.random();
	        if (randomNum < 0.0) {
	          this.tiles[i][j].powerup = 'flame';
	        } else if (randomNum < 0.0) {
	          this.tiles[i][j].powerup = 'bomb';
	        }
	      }
	    }
	  }
	};
	
	
	module.exports = GameMap;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Tile = function (pos, type = 'path') {
	  this.pos = pos;
	  this.type = type;
	  this.safe = true;
	  this.powerup = null;
	};
	
	
	module.exports = Tile;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Flame = function (mapPos, gameMap) {
	  this.mapPos = mapPos;
	  this.gameMap = gameMap;
	
	  this.time = 0;
	  this.extinguishTime = 500;
	  this.refreshIntervalId = setInterval( ()=> {this.time += 100;}, 100 );
	};
	
	
	Flame.prototype.extinguish = function () {
	  clearInterval(this.refreshIntervalId);
	};
	
	
	
	
	
	
	
	module.exports = Flame;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Bomb = __webpack_require__(7);
	
	var bomber = new Image();
	bomber.src = './img/bomber.gif';
	
	
	
	var Character = function (pos, gameMap, playerNum) {
	  this.pos = pos;
	  this.gameMap = gameMap;
	  this.playerNum = playerNum;
	  this.lives = 3;
	  this.vel = [0,0];
	  this.strength = 2;
	  this.numBombs = 1;
	  this.moving = false;
	  this.facing = 'down';
	};
	
	Character.prototype.getMapPos = function () {
	  let mapX = Math.floor((this.pos[0] + (this.gameMap.tileSize / 2)) / this.gameMap.tileSize);
	  let mapY = Math.floor((this.pos[1] + (this.gameMap.tileSize / 2)) / this.gameMap.tileSize);
	  return [mapX, mapY];
	};
	
	Character.prototype.isLeftPathBlocked = function () {
	  let mapLeftX = Math.floor((this.pos[0] - 1) / this.gameMap.tileSize);
	  let mapY = Math.floor((this.pos[1] + (this.gameMap.tileSize / 2)) / this.gameMap.tileSize);
	
	  if (this.gameMap.isPath([mapY, mapLeftX]) && !this.gameMap.isBomb([mapY, mapLeftX])) {
	    return false;
	  } else {
	    return true;
	  }
	};
	
	Character.prototype.isRightPathBlocked = function () {
	  let mapRightX = Math.floor((this.pos[0] + 1) / this.gameMap.tileSize) + 1;
	  let mapY = Math.floor((this.pos[1] + (this.gameMap.tileSize / 2)) / this.gameMap.tileSize);
	
	  if (this.gameMap.isPath([mapY, mapRightX])) {
	    return false;
	  } else {
	    return true;
	  }
	};
	
	Character.prototype.isTopPathBlocked = function () {
	  let mapX = Math.floor((this.pos[0] + (this.gameMap.tileSize / 2)) / this.gameMap.tileSize);
	  let mapTopY = Math.floor((this.pos[1] - 1) / this.gameMap.tileSize);
	
	  if (this.gameMap.isPath([mapTopY, mapX])) {
	    return false;
	  } else {
	    return true;
	  }
	};
	
	Character.prototype.isBottomPathBlocked = function () {
	  let mapX = Math.floor((this.pos[0] + (this.gameMap.tileSize / 2)) / this.gameMap.tileSize);
	  let mapBottomY = Math.floor((this.pos[1] ) / this.gameMap.tileSize) + 1;
	
	  if (this.gameMap.isPath([mapBottomY, mapX])) {
	    return false;
	  } else {
	    return true;
	  }
	};
	
	Character.prototype.move = function (move) {
	  if (move === 'bomb') {
	    return this.dropBomb();
	  }
	
	  this.moving = true;
	
	
	  let currentPos = this.pos;
	  let futurePos;
	
	
	  if (this.isLeftPathBlocked() && this.vel[0] < 0) {
	    futurePos = [currentPos[0], currentPos[1] + this.vel[1]];
	  } else if (this.isRightPathBlocked() && this.vel[0] > 0) {
	    futurePos = [currentPos[0], currentPos[1] + this.vel[1]];
	  } else if (this.isTopPathBlocked() && this.vel[1] < 0) {
	    futurePos = [currentPos[0] + this.vel[0], currentPos[1]];
	  } else if (this.isBottomPathBlocked() && this.vel[1] > 0) {
	    futurePos = [currentPos[0] + this.vel[0], currentPos[1]];
	  } else {
	    futurePos = [currentPos[0] + this.vel[0], currentPos[1] + this.vel[1]];
	  }
	
	  this.pos = futurePos;
	};
	
	Character.prototype.moveUp = function () {
	  this.vel[1] = -1;
	  this.facing = 'up';
	};
	
	Character.prototype.stopMoveUp = function () {
	  this.vel[1] = 0;
	};
	
	Character.prototype.moveDown = function () {
	  this.vel[1] = 1;
	  this.facing = 'down';
	};
	
	Character.prototype.stopMoveDown = function () {
	  this.vel[1] = 0;
	};
	
	Character.prototype.moveRight = function () {
	  this.vel[0] = 1;
	  this.facing = 'right';
	};
	
	Character.prototype.stopMoveRight = function () {
	  this.vel[0] = 0;
	};
	
	Character.prototype.moveLeft = function () {
	  this.vel[0] = -1;
	  this.facing = 'left';
	};
	
	Character.prototype.stopMoveLeft = function () {
	  this.vel[0] = 0;
	};
	
	Character.prototype.dropBomb = function () {
	  var bomb = new Bomb(this.getMapPos(), this.strength, this.gameMap);
	  this.gameMap.addBomb(bomb);
	};
	
	
	Character.prototype.animate = function (direction) {
	
	};
	
	
	
	module.exports = Character;


/***/ },
/* 7 */
/***/ function(module, exports) {

	var Bomb = function (mapPos, strength, gameMap) {
	  this.mapPos = mapPos;
	  this.strength = strength;
	  this.gameMap = gameMap;
	
	  this.time = 0;
	  this.explodeTime = 2000;
	  this.refreshIntervalId = setInterval( ()=> {this.time += 100;}, 100 );
	};
	
	
	Bomb.prototype.explode = function () {
	  // console.log('boom!');
	  clearInterval(this.refreshIntervalId);
	  this.makeFlame();
	};
	
	Bomb.prototype.makeFlame = function () {
	  this.flameRight();
	  this.flameLeft();
	  this.flameTop();
	  this.flameBottom();
	  this.gameMap.makeFlame(this.mapPos);
	};
	
	Bomb.prototype.flameRight = function () {
	  for (var i = 0; i < this.strength; i++) {
	    if (this.gameMap.isPath([this.mapPos[1],this.mapPos[0]+ 1 + i ])) {
	      this.gameMap.makeFlame([this.mapPos[0]+ 1 + i, this.mapPos[1] ]);
	    } else if (this.gameMap.isBlock([this.mapPos[1],this.mapPos[0]+ 1 + i ])) {
	      this.gameMap.destroyBlock([this.mapPos[1],this.mapPos[0]+ 1 + i ]);
	      break;
	    } else {
	      break;
	    }
	  }
	};
	
	Bomb.prototype.flameLeft = function () {
	  for (var i = 0; i < this.strength; i++) {
	    if (this.gameMap.isPath([this.mapPos[1],this.mapPos[0] - 1 - i ])) {
	      this.gameMap.makeFlame([this.mapPos[0] - 1 - i, this.mapPos[1] ]);
	    } else if (this.gameMap.isBlock([this.mapPos[1],this.mapPos[0] - 1 - i ])) {
	      this.gameMap.destroyBlock([this.mapPos[1],this.mapPos[0] - 1 - i ]);
	      break;
	    } else {
	      break;
	    }
	  }
	};
	
	Bomb.prototype.flameTop = function () {
	  for (var i = 0; i < this.strength; i++) {
	
	    if (this.gameMap.isPath([this.mapPos[1] -1-i ,this.mapPos[0]])) {
	      this.gameMap.makeFlame([this.mapPos[0], this.mapPos[1] - 1 - i ]);
	    } else if (this.gameMap.isBlock([this.mapPos[1] -1-i, this.mapPos[0] ])) {
	      this.gameMap.destroyBlock([this.mapPos[1] -1-i, this.mapPos[0] ]);
	      break;
	    } else {
	      break;
	    }
	  }
	};
	
	Bomb.prototype.flameBottom = function () {
	  for (var i = 0; i < this.strength; i++) {
	    if (this.gameMap.isPath([this.mapPos[1] + 1 + i ,this.mapPos[0]])) {
	      this.gameMap.makeFlame([this.mapPos[0], this.mapPos[1] + 1 + i ]);
	    } else if (this.gameMap.isBlock([this.mapPos[1] + 1 + i ,this.mapPos[0]])) {
	      this.gameMap.destroyBlock([this.mapPos[1] + 1 + i ,this.mapPos[0]]);
	      break;
	    } else {
	      break;
	    }
	  }
	};
	module.exports = Bomb;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
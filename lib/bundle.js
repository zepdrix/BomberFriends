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

	const GameView = __webpack_require__(2);
	const GameMap = __webpack_require__(4);
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


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Computer = __webpack_require__(3);
	
	var GameView = function (ctx, gameMap) {
	  this.context = ctx;
	  this.gameMap = gameMap;
	  this.character1 = this.gameMap.addCharacter1();
	  this.character2 = this.gameMap.addCharacter2();
	  // this.computer = new Computer(this.character2);
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
	  this.gameMap.step(time);
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
/***/ function(module, exports) {

	
	
	var Computer = function (character) {
	  this.character = character;
	  this.gameMap = character.gameMap;
	  this.inDanger = false;
	  this.beginRoutine();
	};
	
	Computer.prototype.walkRight = function () {
	  this.character.moveRight();
	};
	
	Computer.prototype.walkLeft = function () {
	  this.character.moveLeft();
	};
	
	Computer.prototype.walkTop = function () {
	  this.character.moveTop();
	};
	
	Computer.prototype.walkDown = function () {
	  this.character.moveDown();
	};
	
	Computer.prototype.beginRoutine = function () {
	
	};
	
	Computer.prototype.findDestination = function () {
	  let gameTiles = this.gameMap.tiles;
	  for (var i = 0; i < gameTiles.length; i++) {
	    for (var j = 0; j < gameTiles[0].length; j++) {
	
	    }
	  }
	};
	
	Computer.prototype.findValidDirection = function () {
	  if (!this.character.isBottomPathBlocked()) {
	    // while (!this.character.isBottomPathBlocked()) {
	      this.walkDown();
	    // }
	  } else if (!this.character.isTopPathBlocked()) {
	    // while (!this.character.isTopPathBlocked()) {
	      this.walkTop();
	    // }
	  } else if (!this.character.isRightPathBlocked()) {
	    // while (!this.character.isRightPathBlocked()) {
	      this.walkRight();
	    // }
	  } else if (!this.character.isLeftPathBlocked()) {
	    // while (!this.character.isLeftPathBlocked()) {
	      this.walkLeft();
	    // }
	  } else {
	    this.findValidDirection();
	  }
	};
	
	Computer.prototype.avoidBomb = function () {
	
	};
	
	Computer.prototype.findBlock = function () {
	
	};
	
	Computer.prototype.startPlay = function () {
	  this.findValidDirection();
	};
	
	module.exports = Computer;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Tile = __webpack_require__(5);
	const Flame = __webpack_require__(6);
	const Character = __webpack_require__(7);
	
	var bombImage = new Image();
	bombImage.src = './img/bomb.png';
	var bomber = new Image();
	bomber.src = './img/bomber.gif';
	var bomberInvinc = new Image();
	bomberInvinc.src = './img/bomber-invinc.png';
	var bomber2Invinc = new Image();
	bomber2Invinc.src = './img/bomber2-invinc.png';
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
	var bombPowerup = new Image();
	bombPowerup.src = './img/bombPowerup.png';
	var speedPowerup = new Image();
	speedPowerup.src = './img/speedPowerup.png';
	var scorebarAvatars = new Image();
	scorebarAvatars.src = './img/scorebar-avatars.gif';
	var flameCenter = new Image();
	flameCenter.src = './img/flamecenter.png';
	var flameRight = new Image();
	flameRight.src = './img/flameright.png';
	var flameTop = new Image();
	flameTop.src = './img/flametop.png';
	var flameLeft = new Image();
	flameLeft.src = './img/flameleft.png';
	var flameBottom = new Image();
	flameBottom.src = './img/flamebottom.png';
	
	var flameImages = {
	  'center': flameCenter,
	  'left': flameLeft,
	  'top': flameTop,
	  'right': flameRight,
	  'bottom': flameBottom
	};
	
	var player1 = {
	  'up': 4,
	  'right': 58,
	  'down': 114,
	  'left': 169
	};
	
	var player2 = {
	  'up': 4,
	  'right': 58,
	  'down': 114,
	  'left': 169
	};
	
	var GameMap = function () {
	  this.tiles = [];
	  this.characters = [];
	  this.tileSize = 16;
	  this.initialize();
	  this.generateBlocks();
	  this.bombs = [];
	  this.flames = [];
	  this.powerups = [];
	  this.time = 0;
	  this.p1Lives = 3;
	  this.p2Lives = 3;
	};
	
	GameMap.DIM_X = 272;
	
	GameMap.DIM_Y = 228;
	
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
	
	GameMap.prototype.step = function (time) {
	  this.characters.forEach( (character) => {
	    character.move();
	  });
	  this.time = Math.floor(time);
	};
	
	GameMap.prototype.addCharacter1 = function () {
	  var character1 = new Character([18, 18], this, 1);
	  this.characters.push(character1);
	  return character1;
	};
	
	GameMap.prototype.addCharacter2 = function () {
	  var character2 = new Character([242, 18], this, 2);
	  this.characters.push(character2);
	  return character2;
	};
	
	GameMap.prototype.addBomb = function (bomb) {
	  this.bombs.push(bomb);
	};
	
	GameMap.prototype.renderBombs = function (ctx) {
	  this.bombs.forEach( (bomb, index) => {
	    if (bomb.time <= bomb.explodeTime) {
	      let sx = bomb.frame * 16;
	      ctx.drawImage(bombImage, sx, 0, 16, 16, bomb.mapPos[0] * this.tileSize, bomb.mapPos[1] * this.tileSize + 20, 16, 16);
	    } else {
	      this.removeBomb(index);
	    }
	  });
	};
	
	GameMap.prototype.renderCharacters = function (ctx) {
	  for (var i = 0; i < this.characters.length; i++) {
	    let character = this.characters[i];
	    let characterImage;
	    let sy;
	    if (this.characters[i].playerNum === 1) {
	      if (character.invincible) {
	        characterImage = bomberInvinc;
	        sy = this.time % 2 === 0 ? 23 : 0;
	      }else {
	        characterImage = bomber;
	        sy = 23;
	      }
	    } else if (this.characters[i].playerNum === 2) {
	      if (character.invincible) {
	        characterImage = bomber2Invinc;
	        sy = this.time % 2 === 0 ? 23 : 0;
	      } else {
	        characterImage = bomber2;
	        sy = 23;
	      }
	    }
	
	    let sx = character.frame * 17 + player1[character.faceDirection()];
	    ctx.drawImage(characterImage, sx, 0, 17, sy, character.pos[0]-2 ,character.pos[1] + 8, 17, 23);
	  }
	};
	
	GameMap.prototype.renderFlames = function (ctx) {
	  this.flames.forEach( (flame, index) => {
	    if (flame.time <= flame.extinguishTime) {
	      let sx = flame.last ? 16 : 0;
	      let sy = flame.frame * 16;
	
	      ctx.drawImage(flameImages[flame.orientation], sx, sy, 16, 16, flame.mapPos[0] * this.tileSize, flame.mapPos[1] * this.tileSize + 20, 16, 16);
	    } else {
	      this.removeFlame(index);
	    }
	  });
	};
	
	GameMap.prototype.renderScoreBar = function (ctx) {
	  ctx.drawImage(scorebarAvatars, 0, 0, 13, 11, 5,5, 13, 11);
	  ctx.drawImage(scorebarAvatars, 13, 0, 13, 11, 238 ,5, 13, 11);
	
	  ctx.strokeText(`x ${this.p1Lives}`,20, 14);
	  ctx.strokeText(`x ${this.p2Lives}`,253, 14);
	};
	
	GameMap.prototype.removeBomb = function (index) {
	  this.bombs[index].explode();
	  this.bombs.splice(index, 1);
	};
	
	GameMap.prototype.renderMap = function (ctx) {
	  var size = 16;
	  let xCoord = 0;
	  let yCoord = 20;
	
	  for (var i = 0; i < this.tiles.length; i++) {
	    for (var j = 0; j < this.tiles[1].length; j++) {
	      if (this.tiles[i][j].type === 'wall') {
	        ctx.drawImage(wall, xCoord, yCoord);
	      } else if (this.tiles[i][j].type === 'block') {
	        let block = this.tiles[i][j];
	        let sx = block.frame * size;
	        ctx.drawImage(blockImage, sx, 0, 16, 16, xCoord, yCoord, 16, 16);
	      } else if (this.tiles[i][j].powerup === 'flame') {
	        ctx.drawImage(flamePowerup, xCoord, yCoord);
	      } else if (this.tiles[i][j].powerup === 'bomb') {
	        ctx.drawImage(bombPowerup, xCoord, yCoord);
	
	      } else if (this.tiles[i][j].powerup === 'speed') {
	        ctx.drawImage(speedPowerup, xCoord, yCoord);
	
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
	  if (this.tiles[pos[1]][pos[0]].type === 'path' ) {
	    return true;
	  } else {
	    return false;
	  }
	};
	
	GameMap.prototype.isPowerup = function (pos) {
	  if (this.tiles[pos[1]][pos[0]].powerup) {
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
	  let isBomb = false;
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
	  return this.tiles[pos[1]][pos[0]].type === 'block';
	};
	
	GameMap.prototype.destroyBlock = function (pos) {
	  this.tiles[pos[1]][pos[0]].animateDestroy();
	};
	
	
	GameMap.prototype.isLeftPathUnsafe = function (character) {
	  let centerPos = character.centerPos();
	  centerPos[0] -= 6;
	  let mapCenterPos = character.getMapPos(centerPos);
	
	  return this.isUnsafe([mapCenterPos[1], mapCenterPos[0]]);
	};
	
	GameMap.prototype.isRightPathUnsafe = function (character) {
	  let centerPos = character.centerPos();
	  centerPos[0] += 6;
	  let mapCenterPos = character.getMapPos(centerPos);
	
	  return this.isUnsafe([mapCenterPos[1], mapCenterPos[0]]);
	};
	
	GameMap.prototype.isTopPathUnsafe = function (character) {
	  let centerPos = character.centerPos();
	  centerPos[1] -= 6;
	  let mapCenterPos = character.getMapPos(centerPos);
	
	  return this.isUnsafe([mapCenterPos[1], mapCenterPos[0]]);
	};
	
	GameMap.prototype.isBottomPathUnsafe = function (character) {
	  let centerPos = character.centerPos();
	  centerPos[1] += 6;
	  let mapCenterPos = character.getMapPos(centerPos);
	
	  return this.isUnsafe([mapCenterPos[1], mapCenterPos[0]]);
	};
	
	GameMap.prototype.isLeftPathPowerup = function (character) {
	  let centerPos = character.centerPos();
	  centerPos[0] -= 6;
	  let mapCenterPos = character.getMapPos(centerPos);
	
	  return this.isPowerup(mapCenterPos);
	};
	
	GameMap.prototype.isRightPathPowerup = function (character) {
	  let centerPos = character.centerPos();
	  centerPos[0] += 6;
	  let mapCenterPos = character.getMapPos(centerPos);
	
	  return this.isPowerup(mapCenterPos);
	};
	
	GameMap.prototype.isTopPathPowerup = function (character) {
	  let centerPos = character.centerPos();
	  centerPos[1] -= 6;
	  let mapCenterPos = character.getMapPos(centerPos);
	  return this.isPowerup(mapCenterPos);
	};
	
	GameMap.prototype.isBottomPathPowerup = function (character) {
	  let centerPos = character.centerPos();
	  centerPos[1] += 6;
	  let mapCenterPos = character.getMapPos(centerPos);
	
	  return {isPowerup: this.isPowerup(mapCenterPos), pos: mapCenterPos };
	};
	
	GameMap.prototype.isOnPowerup = function (character) {
	  let centerPos = character.centerPos();
	  let mapCenterPos = character.getMapPos(centerPos);
	
	  return {isPowerup: this.isPowerup(mapCenterPos), pos: mapCenterPos };
	};
	
	
	
	
	GameMap.prototype.makeFlame = function (pos, orientation, last) {
	  let gameTile = this.tiles[pos[1]][pos[0]];
	  gameTile.safe = false;
	
	
	  if (gameTile.type === 'block') {
	    if (gameTile.powerup === null) {
	      gameTile.type = 'path';
	    } else if (gameTile.type === 'flame') {
	
	    } else if (gameTile.type === 'bomb') {
	
	    }
	  } else if (gameTile.type === 'path' ) {
	    if (gameTile.powerup !== null) {
	      gameTile.powerup = null;
	    }
	  }
	
	  let flame = new Flame(pos, this, orientation, last);
	  this.flames.push(flame);
	};
	
	GameMap.prototype.removeFlame = function (index) {
	  this.flames[index].extinguish();
	  this.tiles[this.flames[index].mapPos[1]][this.flames[index].mapPos[0]].safe = true;
	  this.flames.splice(index, 1);
	};
	
	GameMap.prototype.checkCharacter = function () {
	  this.characters.forEach( (character, index) => {
	    if ((this.isTopPathUnsafe(character) || this.isRightPathUnsafe(character) ||
	    this.isBottomPathUnsafe(character) || this.isLeftPathUnsafe(character)) && !character.invincible) {
	      this.removeCharacter(index);
	    }
	    let powerupObj = this.isOnPowerup(character);
	    if (powerupObj.isPowerup) {
	      this.pickupPowerup(character, powerupObj.pos);
	    }
	  });
	};
	
	GameMap.prototype.pickupPowerup = function (character, pos) {
	  if (this.tiles[pos[1]][pos[0]].powerup === 'flame') {
	    character.strength += 1;
	  } else if (this.tiles[pos[1]][pos[0]].powerup === 'bomb') {
	    character.numBombs +=1;
	  } else if (this.tiles[pos[1]][pos[0]].powerup === 'speed' && character.speed < 1.5) {
	    character.speed += 0.1;
	  }
	  this.tiles[pos[1]][pos[0]].powerup = null;
	};
	
	GameMap.prototype.removeCharacter = function (index) {
	  let character = this.characters[index];
	  if (character.lives > 0) {
	    character.lives -= 1;
	    if (character.playerNum === 1) {
	      this.p1Lives -= 1;
	    } else {
	      this.p2Lives -= 1;
	    }
	    this.respawnCharacter(character, index);
	  } else {
	    this.characters.splice(index, 1);
	  }
	};
	
	GameMap.prototype.respawnCharacter  = function (character, index) {
	  this.characters.splice(index, 1);
	  setTimeout( () => {
	    character.invincible = true;
	    this.characters.push(character);
	    setTimeout( () => { character.invincible = false; }, 2000);
	  }, 1000);
	};
	
	GameMap.prototype.drawFrame = function (ctx) {
	  ctx.clearRect(0, 0, GameMap.DIM_X, GameMap.DIM_Y);
	  this.checkCharacter();
	  this.renderScoreBar(ctx);
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
	        if (randomNum < 0.15) {
	          this.tiles[i][j].powerup = 'flame';
	        } else if (randomNum > 0.4 && randomNum < 0.6) {
	          this.tiles[i][j].powerup = 'bomb';
	        } else if (randomNum > 0.7 && randomNum < 0.8) {
	          this.tiles[i][j].powerup = 'speed';
	        }
	      }
	    }
	  }
	};
	
	
	module.exports = GameMap;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Tile = function (pos, type = 'path') {
	  this.pos = pos;
	  this.type = type;
	  this.safe = true;
	  this.powerup = null;
	  this.time = 0;
	  this.destroyTime = 200;
	  this.frame = 0;
	  // this.refreshIntervalId = null;
	};
	
	Tile.prototype.destroy = function () {
	  if (this.time >= this.destroyTime) {
	    clearInterval(this.refreshIntervalId);
	    this.type = 'path';
	  } else {
	    this.time += 80;
	    this.frame += 1;
	  }
	};
	
	
	
	Tile.prototype.animateDestroy = function () {
	    this.refreshIntervalId = setInterval( () => { this.destroy(); }, 80 );
	};
	
	
	module.exports = Tile;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var Flame = function (mapPos, gameMap, orientation, last) {
	  this.mapPos = mapPos;
	  this.gameMap = gameMap;
	  this.orientation = orientation;
	  this.last = last;
	  this.time = 0;
	  this.frame = 0;
	  this.extinguishTime = 500;
	  this.refreshIntervalId = setInterval( ()=> { this.time += 100; }, 100 );
	  this.frameIntervalId = setInterval( ()=> { this.frame += 1; }, 80 );
	};
	
	
	Flame.prototype.extinguish = function () {
	  clearInterval(this.refreshIntervalId);
	  clearInterval(this.frameIntervalId);
	};
	
	
	
	
	
	
	
	module.exports = Flame;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Bomb = __webpack_require__(8);
	
	var Character = function (pos, gameMap, playerNum) {
	  this.pos = pos;
	  this.gameMap = gameMap;
	  this.playerNum = playerNum;
	  this.invincible = false;
	  this.lives = 3;
	  this.vel = [0,0];
	  this.speed = 1;
	  this.strength = 1;
	  this.numBombs = 1;
	  this.activeBombs = 0;
	  this.moving = false;
	  this.facing = 'down';
	  this.actualVel = [0,0];
	  this.frame = 0;
	};
	
	Character.prototype.incrementFrame = function () {
	  if (this.frame < 2) {
	    this.frame += 1;
	  } else {
	    this.frame = 0;
	  }
	};
	
	Character.prototype.startMoving = function () {
	  if (!this.moving) {
	    this.moving = true;
	    this.intervalId = setInterval(() => {
	      this.incrementFrame();
	    }, 150 / this.speed);
	  }
	};
	
	Character.prototype.stopMoving = function () {
	  if (this.vel[0] === 0 && this.vel[1] === 0 && this.moving) {
	    this.moving = false;
	    clearInterval(this.intervalId);
	    this.frame = 0;
	  }
	};
	
	Character.prototype.getMapPos = function (pos) {
	  let mapX = Math.floor(pos[0] / this.gameMap.tileSize);
	  let mapY = Math.floor(pos[1] / this.gameMap.tileSize);
	  return [mapX, mapY];
	};
	
	Character.prototype.getMapBombPos = function () {
	  let mapX = Math.floor((this.pos[0] + 6) / this.gameMap.tileSize);
	  let mapY = Math.floor((this.pos[1] + 6) / this.gameMap.tileSize);
	  return [mapX, mapY];
	};
	
	Character.prototype.topRightPos = function () {
	  let topRightPos = [this.pos[0], this.pos[1]];
	  topRightPos[0] += 12;
	  return topRightPos;
	};
	
	Character.prototype.bottomRightPos = function () {
	  let bottomRightPos = [this.pos[0], this.pos[1]];
	  bottomRightPos[0] += 12;
	  bottomRightPos[1] += 12;
	  return bottomRightPos;
	};
	
	
	Character.prototype.bottomLeftPos = function () {
	  let bottomLeftPos = [this.pos[0], this.pos[1]];
	  bottomLeftPos[1] += 12;
	  return bottomLeftPos;
	};
	
	Character.prototype.centerPos = function () {
	  let centerPos = [this.pos[0], this.pos[1]];
	  centerPos[0] += 7;
	  centerPos[1] += 7;
	  return centerPos;
	};
	
	Character.prototype.isLeftPathBlocked = function () {
	  let topLeftPos = [this.pos[0], this.pos[1]];
	  topLeftPos[0] -= 1 * this.speed;
	  let topLeftMapPos = this.getMapPos(topLeftPos);
	
	  let bottomLeftPos = [this.bottomLeftPos()[0], this.bottomLeftPos()[1]];
	  bottomLeftPos[0] -= 1 * this.speed;
	  let bottomLeftMapPos = this.getMapPos(bottomLeftPos);
	
	  if (this.gameMap.isPath(topLeftMapPos) && this.gameMap.isPath(bottomLeftMapPos)) {
	    if (this.gameMap.isBomb(this.getMapBombPos(this.pos)) !== false) {
	      return false;
	    } else if (this.gameMap.isBomb(topLeftMapPos) !== false) {
	      return true;
	    }
	  } else {
	    return true;
	  }
	};
	
	Character.prototype.isRightPathBlocked = function () {
	  let topRightPos = [this.topRightPos()[0], this.topRightPos()[1]];
	  topRightPos[0] += 1 * this.speed;
	  let topRightMapPos = this.getMapPos(topRightPos);
	
	  let bottomRightPos = [this.bottomRightPos()[0], this.bottomRightPos()[1]];
	  bottomRightPos[0] += 1 * this.speed;
	  let bottomRightMapPos = this.getMapPos(bottomRightPos);
	
	  // let otherBottomRightPos = [this.bottomRightPos()[0], this.bottomRightPos()[1]];
	  // otherBottomRightPos [0] += 1;
	  // otherBottomRightPos [1] += 1;
	  // let otherBottomRightMapPos = this.getMapPos(otherBottomRightPos);
	
	  if (this.gameMap.isPath(topRightMapPos) && this.gameMap.isPath(bottomRightMapPos)) {
	    if (this.gameMap.isBomb(this.getMapBombPos(this.pos)) !== false) {
	      return false;
	    } else if (this.gameMap.isBomb(topRightMapPos) !== false) {
	      return true;
	    }
	  } else {
	    return true;
	  }
	};
	
	Character.prototype.isTopPathBlocked = function () {
	  let topLeftPos = [this.pos[0], this.pos[1]];
	  topLeftPos[1] -= 1 * this.speed;
	  let topLeftMapPos = this.getMapPos(topLeftPos);
	
	  let topRightPos = [this.topRightPos()[0], this.topRightPos()[1]];
	  topRightPos[1] -= 1 * this.speed;
	  let topRightMapPos = this.getMapPos(topRightPos);
	
	  if (this.gameMap.isPath(topLeftMapPos) && this.gameMap.isPath(topRightMapPos)) {
	    if (this.gameMap.isBomb(this.getMapBombPos(this.pos)) !== false) {
	      return false;
	    } else if (this.gameMap.isBomb(topLeftMapPos) !== false) {
	      return true;
	    }
	  } else {
	    return true;
	  }
	};
	
	Character.prototype.isBottomPathBlocked = function () {
	  let bottomLeftPos = [this.bottomLeftPos()[0], this.bottomLeftPos()[1]];
	  bottomLeftPos[1] += 1 * this.speed;
	  let bottomLeftMapPos = this.getMapPos(bottomLeftPos);
	
	  let bottomRightPos = [this.bottomRightPos()[0], this.bottomRightPos()[1]];
	  bottomRightPos[1] += 1 * this.speed;
	  let bottomRightMapPos = this.getMapPos(bottomRightPos);
	
	
	
	  if (this.gameMap.isPath(bottomLeftMapPos) && this.gameMap.isPath(bottomRightMapPos) ) {
	    if (this.gameMap.isBomb(this.getMapBombPos(this.pos)) !== false) {
	      return false;
	    } else if (this.gameMap.isBomb(bottomLeftMapPos) !== false ) {
	      return true;
	    } else {
	      return false;
	    }
	  } else {
	    return true;
	  }
	};
	
	Character.prototype.move = function (move) {
	  if (move === 'bomb') {
	    return this.dropBomb();
	  }
	
	  let currentPos = this.pos;
	  let deltaX = this.vel[0];
	  let deltaY = this.vel[1];
	  let futurePos;
	
	  if (this.isLeftPathBlocked() && this.isTopPathBlocked() && this.isRightPathBlocked()) {
	    if (deltaX > 0 || deltaX < 0) {
	      deltaX = 0;
	    }
	  } else if (this.isLeftPathBlocked() && this.isTopPathBlocked() && this.isBottomPathBlocked()) {
	    if (deltaY > 0 || deltaY < 0) {
	      deltaY = 0;
	    }
	  } else if (this.isLeftPathBlocked() && this.isTopPathBlocked()) {
	    if (deltaX < 0) {
	      deltaX = 0;
	    }
	    if (deltaY < 0) {
	      deltaY = 0;
	    }
	  } else if (this.isTopPathBlocked() && this.isRightPathBlocked()) {
	    if (deltaX > 0) {
	      deltaX = 0;
	    }
	    if (deltaY < 0) {
	      deltaY = 0;
	    }
	  } else if (this.isRightPathBlocked() && this.isBottomPathBlocked()) {
	    if (deltaX > 0) {
	      deltaX = 0;
	    }
	    if (deltaY > 0) {
	      deltaY = 0;
	    }
	  } else if (this.isBottomPathBlocked() && this.isLeftPathBlocked()) {
	    if (deltaX < 0) {
	      deltaX = 0;
	    }
	    if (deltaY > 0) {
	      deltaY = 0;
	    }
	  } else if (this.isLeftPathBlocked() && deltaX < 0) {
	    deltaX = 0;
	  } else if (this.isRightPathBlocked() && deltaX > 0) {
	    deltaX = 0;
	  } else if (this.isTopPathBlocked() && deltaY < 0) {
	    deltaY = 0;
	  } else if (this.isBottomPathBlocked() && deltaY > 0) {
	    deltaY = 0;
	  }
	  this.actualVel = [deltaX, deltaY];
	  futurePos = [currentPos[0] + deltaX, currentPos[1] + deltaY];
	  this.pos = futurePos;
	};
	
	Character.prototype.faceDirection = function () {
	  if (this.actualVel[0] < 0) {
	    this.facing = 'left';
	    return 'left';
	  } else if (this.actualVel[0] > 0) {
	    this.facing = 'right';
	
	    return 'right';
	  } else if (this.actualVel[1] < 0) {
	    this.facing = 'up';
	
	    return 'up';
	  } else if (this.actualVel[1] > 0) {
	    this.facing = 'down';
	    return 'down';
	  }
	  return this.facing;
	};
	
	Character.prototype.moveUp = function () {
	  this.vel[1] = -1 * this.speed;
	  this.startMoving();
	};
	
	Character.prototype.stopMoveUp = function () {
	  this.vel[1] = 0;
	  this.stopMoving();
	};
	
	Character.prototype.moveDown = function () {
	  this.vel[1] = 1 * this.speed;
	  this.startMoving();
	};
	
	Character.prototype.stopMoveDown = function () {
	  this.vel[1] = 0;
	  this.stopMoving();
	};
	
	Character.prototype.moveRight = function () {
	  this.vel[0] = 1 * this.speed;
	  this.startMoving();
	};
	
	Character.prototype.stopMoveRight = function () {
	  this.vel[0] = 0;
	  this.stopMoving();
	};
	
	Character.prototype.moveLeft = function () {
	  this.vel[0] = -1 * this.speed;
	  this.startMoving();
	};
	
	Character.prototype.stopMoveLeft = function () {
	  this.vel[0] = 0;
	  this.stopMoving();
	};
	
	Character.prototype.dropBomb = function () {
	  if (this.activeBombs < this.numBombs) {
	    this.activeBombs += 1;
	    var bomb = new Bomb(this.getMapBombPos(this.pos), this.strength, this.gameMap);
	    this.gameMap.addBomb(bomb);
	    setTimeout( () => {
	      this.activeBombs -= 1;
	    }, 2000);
	  }
	};
	
	
	module.exports = Character;


/***/ },
/* 8 */
/***/ function(module, exports) {

	var Bomb = function (mapPos, strength, gameMap) {
	  this.mapPos = mapPos;
	  this.strength = strength;
	  this.gameMap = gameMap;
	
	  this.time = 0;
	  this.explodeTime = 2000;
	  this.refreshIntervalId = setInterval( ()=> {
	    this.time += 200;
	    if (this.frame === 4) {
	      this.frame = 0;
	    } else {
	      this.frame += 1;
	    }
	  }, 200 );
	  this.frame = 0;
	};
	
	
	Bomb.prototype.explode = function () {
	  clearInterval(this.refreshIntervalId);
	  this.makeFlame();
	};
	
	Bomb.prototype.makeFlame = function () {
	  this.flameRight();
	  this.flameLeft();
	  this.flameTop();
	  this.flameBottom();
	  this.gameMap.makeFlame(this.mapPos, 'center');
	};
	
	Bomb.prototype.flameRight = function () {
	  for (var i = 0; i < this.strength; i++) {
	    let pos = [this.mapPos[0]+ 1 + i, this.mapPos[1]];
	    if (this.gameMap.isPath(pos)) {
	      let last = false;
	      if (i === this.strength - 1) {
	        last = true;
	      }
	      this.gameMap.makeFlame(pos, 'right', last);
	      // let bombId = this.gameMap.isBomb(pos);
	      // if (bombId) {
	      //   this.gameMap.removeBomb(bombId);
	      // }
	    } else if (this.gameMap.isBlock(pos)) {
	      this.gameMap.destroyBlock(pos);
	      break;
	    } else {
	      break;
	    }
	  }
	};
	
	Bomb.prototype.flameLeft = function () {
	
	  for (var i = 0; i < this.strength; i++) {
	    let pos = [this.mapPos[0] - 1 - i ,this.mapPos[1]];
	    if (this.gameMap.isPath(pos)) {
	      let last = false;
	      if (i === this.strength - 1) {
	        last = true;
	      }
	      this.gameMap.makeFlame(pos, 'left', last);
	
	    } else if (this.gameMap.isBlock(pos)) {
	      this.gameMap.destroyBlock(pos);
	      break;
	    } else {
	      break;
	    }
	  }
	};
	
	Bomb.prototype.flameTop = function () {
	
	  for (var i = 0; i < this.strength; i++) {
	    let pos = [this.mapPos[0], this.mapPos[1] - 1 - i];
	    if (this.gameMap.isPath(pos)) {
	      let last = false;
	      if (i === this.strength - 1) {
	        last = true;
	      }
	      this.gameMap.makeFlame(pos, 'top', last);
	
	    } else if (this.gameMap.isBlock(pos)) {
	      this.gameMap.destroyBlock(pos);
	      break;
	    } else {
	      break;
	    }
	  }
	};
	
	Bomb.prototype.flameBottom = function () {
	
	  for (var i = 0; i < this.strength; i++) {
	    let pos = [this.mapPos[0], this.mapPos[1] + 1 + i];
	    if (this.gameMap.isPath(pos)) {
	      let last = false;
	      if (i === this.strength - 1) {
	        last = true;
	      }
	      this.gameMap.makeFlame(pos, 'bottom', last);
	
	    } else if (this.gameMap.isBlock(pos)) {
	      this.gameMap.destroyBlock(pos);
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
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

	const GameView = __webpack_require__(1);
	const GameMap = __webpack_require__(3);
	const gameMenu = new Image();
	gameMenu.src = './img/menu.png';
	
	const menuMusic = new Audio();
	menuMusic.src = './sounds/goonies-wiseman.mp3';
	menuMusic.volume = 0.5;
	
	document.addEventListener("DOMContentLoaded", function(){
	  let canvasEl = document.getElementsByTagName("canvas")[0];
	
	  canvasEl.width = GameMap.DIM_X;
	  canvasEl.height = GameMap.DIM_Y;
	
	  let ctx = canvasEl.getContext("2d");
	  gameMenu.onload =  () => {
	    ctx.drawImage(gameMenu, 0, 0, 272, 228, 0, 0, 272, 228);
	  };
	  let soundOn = true;
	  menuMusic.loop = true;
	  menuMusic.play();
	  var map, view;
	  document.onkeydown = (e) =>{
	    if (e.key === 'm') {
	      menuMusic.pause();
	      map = new GameMap(soundOn, 4);
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
	
	
	
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Computer = __webpack_require__(2);
	
	var gameOver = new Image();
	gameOver.src = './img/gameover.png';
	
	var GameView = function (ctx, gameMap, computer = false) {
	
	  this.context = ctx;
	  this.gameMap = gameMap;
	  this.character1 = this.gameMap.addCharacter1();
	  this.character2 = this.gameMap.addCharacter2();
	  this.character3 = this.gameMap.addCharacter3();
	  this.character4 = this.gameMap.addCharacter4();
	
	  this.computer = computer;
	
	  if (computer) {
	    this.computer1 = new Computer(this.character2);
	    this.gameMap.computer = true;
	  }
	
	  this.computer2 = new Computer(this.character3);
	  this.computer3 = new Computer(this.character4);
	};
	
	GameView.prototype.bindKeyHandlers = function (character, character2 = false) {
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
	
	    if (!!character2) {
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
	
	    }
	  };
	
	  onkeyup = function (e) {
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
	    if (!!character2) {
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
	
	    }
	
	  };
	};
	
	
	GameView.prototype.start = function () {
	  if (this.computer) {
	    this.bindKeyHandlers(this.character1);
	  } else {
	    this.bindKeyHandlers(this.character1, this.character2);
	  }
	
	  this.lastTime = 0;
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	GameView.prototype.animate = function (time) {
	  const timeDelta = time - this.lastTime;
	  this.gameMap.step(time);
	
	  if (this.gameMap.time < time) {
	    this.gameMap.drawFrame(this.context);
	  }
	
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
/* 2 */
/***/ function(module, exports) {

	var Computer = function (character) {
	  this.character = character;
	  this.gameMap = character.gameMap;
	  this.pos = character.pos;
	  this.futurePos = null;
	  this.dangerTiles = [];
	  this.inDanger = false;
	  this.validMoves = {};
	  this.direction = null;
	  this.previousMapPos = [];
	  this.previousDirection = null;
	  this.numBombs = 1;
	  this.move(this.findAdjacentTile());
	  this.prevPathTrapped = false;
	};
	
	const oppositeDirections = {
	  'top': 'bottom',
	  'bottom': 'top',
	  'left': 'right',
	  'right': 'left'
	};
	
	Computer.prototype.walkRight = function (stop) {
	  if (stop) {
	    this.character.stopMoveRight();
	  } else {
	    this.character.moveRight();
	  }
	};
	
	Computer.prototype.walkLeft = function (stop) {
	  if (stop) {
	    this.character.stopMoveLeft();
	  } else {
	    this.character.moveLeft();
	  }
	};
	
	Computer.prototype.walkTop = function (stop) {
	  if (stop) {
	    this.character.stopMoveUp();
	  } else {
	    this.character.moveUp();
	  }
	};
	
	Computer.prototype.walkBottom = function (stop) {
	  if (stop) {
	    this.character.stopMoveDown();
	  } else {
	    this.character.moveDown();
	  }
	};
	
	Computer.prototype.move = function (directionObj = false) {
	  if (directionObj !== false) {
	
	    let futureMapPos = directionObj.mapPos;
	    let futureMapPosX = Math.floor((futureMapPos[0] * 16) + 2);
	    let futureMapPosY = Math.floor((futureMapPos[1] * 16) + 2);
	    this.futurePos = [futureMapPosX, futureMapPosY];
	    let walkFunc;
	    if (directionObj.direction === 'top') {
	      walkFunc = this.walkTop.bind(this);
	    } else if (directionObj.direction === 'right') {
	      walkFunc = this.walkRight.bind(this);
	    } else if (directionObj.direction === 'bottom') {
	      walkFunc = this.walkBottom.bind(this);
	    } else if (directionObj.direction === 'left') {
	      walkFunc = this.walkLeft.bind(this);
	    }
	
	    walkFunc();
	    this.refreshIntervalId = setInterval( () => {
	      let futurePosX = this.futurePos[0];
	      let futurePosY =  this.futurePos[1];
	
	      let characterPosX = this.character.pos[0];
	      let characterPosY = this.character.pos[1];
	      if (futurePosX === characterPosX && futurePosY === characterPosY) {
	
	        walkFunc(123);
	        clearInterval(this.refreshIntervalId);
	        this.handleTurn();
	      }
	    }, 5);
	  }
	};
	
	Computer.prototype.handleTurn = function () {
	  let mapPos = this.character.getMapBombPos(this.character.pos);
	  if (this.gameMap.isPlayer(mapPos, this.character.playerNum) !== false && this.prevPathTrapped === false ) {
	    this.move(this.findAdjacentTile());
	    this.character.dropBomb();
	
	  } else if (this.nextToBlock() && this.character.activeBombs < this.character.numBombs && this.numBombs > 0 && this.prevPathTrapped === false) {
	    this.numBombs -= 1;
	    this.character.dropBomb();
	    setTimeout( () => { this.numBombs += 1; }, 2000);
	    this.move({ direction: oppositeDirections[this.previousDirection], mapPos: this.previousMapPos[0] });
	    this.previousMapPos.unshift(this.character.getMapBombPos());
	
	  } else {
	    this.move(this.findAdjacentTile());
	  }
	};
	
	Computer.prototype.startPlay = function () {
	  this.findValidDirection();
	};
	
	
	Computer.prototype.nextToBlock = function () {
	  let mapPos = this.character.getMapPos(this.character.pos);
	
	  if (this.gameMap.isBlock([mapPos[0], mapPos[1] + 1]) || this.gameMap.isBlock([mapPos[0], mapPos[1] - 1]) ||
	      this.gameMap.isBlock([mapPos[0] + 1, mapPos[1]])|| this.gameMap.isBlock([mapPos[0] - 1, mapPos[1]])) {
	      return true;
	  } else {
	    return false;
	  }
	};
	
	Computer.prototype.isDangerous = function (pos) {
	  this.dangerTiles = {};
	
	  this.gameMap.bombs.forEach( (bomb) => {
	    this.dangerTiles[[bomb.mapPos[0], bomb.mapPos[1]]] = true;
	    for (var i = 0; i < bomb.strength; i++) {
	      if (this.gameMap.isPath([bomb.mapPos[0], bomb.mapPos[1] + 1])) {
	        this.dangerTiles[[bomb.mapPos[0], bomb.mapPos[1] + 1]] = true;
	      }
	      if (this.gameMap.isPath([bomb.mapPos[0], bomb.mapPos[1] - 1])) {
	        this.dangerTiles[[bomb.mapPos[0], bomb.mapPos[1] - 1]] = true;
	      }
	      if (this.gameMap.isPath([bomb.mapPos[0] + 1, bomb.mapPos[1]])) {
	        this.dangerTiles[[bomb.mapPos[0] + 1, bomb.mapPos[1]]] = true;
	      }
	      if (this.gameMap.isPath([bomb.mapPos[0] - 1, bomb.mapPos[1]])) {
	        this.dangerTiles[[bomb.mapPos[0] - 1, bomb.mapPos[1]]] = true;
	      }
	    }
	  });
	
	  this.gameMap.flames.forEach( (flame) => {
	    this.dangerTiles[[flame.mapPos[0], flame.mapPos[1]]] = true;
	  });
	  return this.dangerTiles.hasOwnProperty(pos);
	};
	
	Computer.prototype.numPaths = function (pos) {
	  let numPaths = 0;
	  let mapPos = this.character.getMapPos(this.character.pos);
	  let mapPosX = mapPos[0];
	  let mapPosY = mapPos[1];
	
	  if (this.gameMap.isPath([mapPos[0] + 1, mapPos[1]])) {
	    numPaths += 1;
	  }
	
	  if (this.gameMap.isPath([mapPos[0] - 1, mapPos[1]])) {
	    numPaths += 1;
	  }
	
	  if (this.gameMap.isPath([mapPos[0], mapPos[1] + 1])) {
	    numPaths += 1;
	  }
	
	  if (this.gameMap.isPath([mapPos[0], mapPos[1] - 1])) {
	    numPaths += 1;
	  }
	
	  return numPaths;
	};
	
	Computer.prototype.findAdjacentTile = function () {
	  let mapPos = this.character.getMapPos(this.character.pos);
	  let previousMapPosX = this.previousMapPos[0] ? this.previousMapPos[0][0] : 0;
	  let previousMapPosY = this.previousMapPos[0] ? this.previousMapPos[0][1] : 0;
	  this.previousMapPos.unshift(mapPos);
	
	  let mapPosX = mapPos[0];
	  let mapPosY = mapPos[1];
	
	  if (this.numPaths(mapPos) === 1) {
	    this.prevPathTrapped = true;
	  } else {
	    this.prevPathTrapped = false;
	  }
	
	  if (Math.random() < 0.5 && this.gameMap.isPath([mapPos[0] + 1, mapPos[1]]) && !this.isDangerous([mapPos[0] + 1, mapPos[1]]) && this.gameMap.isBomb([mapPos[0] + 1, mapPos[1]]) === false && (previousMapPosX !== mapPosX + 1 || previousMapPosY !== mapPosY)) {
	  mapPos = [mapPos[0] + 1, mapPos[1]];
	  this.previousDirection = 'right';
	  return { direction: 'right', mapPos: mapPos };
	  } else if (Math.random() < 0.5 && this.gameMap.isPath([mapPos[0] - 1, mapPos[1]]) && !this.isDangerous([mapPos[0] - 1, mapPos[1]]) && this.gameMap.isBomb([mapPos[0] - 1, mapPos[1]]) === false && (previousMapPosX !== mapPosX - 1 || previousMapPosY !== mapPosY)) {
	    mapPos = [mapPos[0] - 1, mapPos[1]];
	    this.previousDirection = 'left';
	    return { direction: 'left', mapPos: mapPos };
	  } else if (this.gameMap.isPath([mapPos[0], mapPos[1] + 1]) && !this.isDangerous([mapPos[0], mapPos[1] + 1]) && this.gameMap.isBomb([mapPos[0], mapPos[1] + 1]) === false && (previousMapPosX !== mapPosX || previousMapPosY !== mapPosY + 1)) {
	    mapPos = [mapPos[0], mapPos[1] + 1];
	    this.previousDirection = 'bottom';
	    return { direction: 'bottom', mapPos: mapPos };
	  } else if (this.gameMap.isPath([mapPos[0], mapPos[1] - 1]) && !this.isDangerous([mapPos[0], mapPos[1] - 1]) && this.gameMap.isBomb([mapPos[0], mapPos[1] - 1]) === false && (previousMapPosX !== mapPosX || previousMapPosY !== mapPosY - 1)) {
	    mapPos = [mapPos[0], mapPos[1] - 1];
	    this.previousDirection = 'top';
	    return { direction: 'top', mapPos: mapPos };
	  } else if (Math.random() < 0.5 && this.gameMap.isPath([mapPos[0] + 1, mapPos[1]]) && !this.isDangerous([mapPos[0] + 1, mapPos[1]]) && this.gameMap.isBomb([mapPos[0] + 1, mapPos[1]]) === false && (previousMapPosX !== mapPosX + 1 || previousMapPosY !== mapPosY)) {
	    mapPos = [mapPos[0] + 1, mapPos[1]];
	    this.previousDirection = 'right';
	    return { direction: 'right', mapPos: mapPos };
	  } else if (this.gameMap.isPath([mapPos[0] - 1, mapPos[1]]) && !this.isDangerous([mapPos[0] - 1, mapPos[1]]) && this.gameMap.isBomb([mapPos[0] - 1, mapPos[1]]) === false && (previousMapPosX !== mapPosX - 1 || previousMapPosY !== mapPosY)) {
	    mapPos = [mapPos[0] - 1, mapPos[1]];
	    this.previousDirection = 'left';
	    return { direction: 'left', mapPos: mapPos };
	  } else if (this.gameMap.isPath([mapPos[0] + 1, mapPos[1]]) && !this.isDangerous([mapPos[0] + 1, mapPos[1]]) && this.gameMap.isBomb([mapPos[0] + 1, mapPos[1]]) === false && (previousMapPosX !== mapPosX + 1 || previousMapPosY !== mapPosY)) {
	    mapPos = [mapPos[0] + 1, mapPos[1]];
	    this.previousDirection = 'right';
	    return { direction: 'right', mapPos: mapPos };
	  } else  if (this.gameMap.isPath([mapPos[0], mapPos[1] + 1]) && !this.isDangerous([mapPos[0], mapPos[1] + 1]) && this.gameMap.isBomb([mapPos[0], mapPos[1] + 1]) === false ) {
	    mapPos = [mapPos[0], mapPos[1] + 1];
	    this.previousDirection = 'bottom';
	    return { direction: 'bottom', mapPos: mapPos };
	  } else if (this.gameMap.isPath([mapPos[0], mapPos[1] - 1]) && !this.isDangerous([mapPos[0], mapPos[1] - 1]) && this.gameMap.isBomb([mapPos[0], mapPos[1] - 1]) === false ) {
	    mapPos = [mapPos[0], mapPos[1] - 1];
	    this.previousDirection = 'top';
	    return { direction: 'top', mapPos: mapPos };
	  } else if (this.gameMap.isPath([mapPos[0] + 1, mapPos[1]]) && !this.isDangerous([mapPos[0] + 1, mapPos[1]]) && this.gameMap.isBomb([mapPos[0] + 1, mapPos[1]]) === false ) {
	    mapPos = [mapPos[0] + 1, mapPos[1]];
	    this.previousDirection = 'right';
	    return { direction: 'right', mapPos: mapPos };
	  } else if (this.gameMap.isPath([mapPos[0] - 1, mapPos[1]]) && !this.isDangerous([mapPos[0] - 1, mapPos[1]]) && this.gameMap.isBomb([mapPos[0] - 1, mapPos[1]]) === false ) {
	    mapPos = [mapPos[0] - 1, mapPos[1]];
	    this.previousDirection = 'left';
	    return { direction: 'left', mapPos: mapPos };
	  } else if (this.gameMap.isBomb(mapPos) !== false) {
	    if (this.gameMap.isPath([mapPos[0], mapPos[1] + 1]) && this.gameMap.isBomb([mapPos[0], mapPos[1] + 1]) === false ) {
	      mapPos = [mapPos[0], mapPos[1] + 1];
	      this.previousDirection = 'bottom';
	      return { direction: 'bottom', mapPos: mapPos };
	    } else if (this.gameMap.isPath([mapPos[0], mapPos[1] - 1]) && this.gameMap.isBomb([mapPos[0], mapPos[1] - 1]) === false ) {
	      mapPos = [mapPos[0], mapPos[1] - 1];
	      this.previousDirection = 'top';
	      return { direction: 'top', mapPos: mapPos };
	    } else if (this.gameMap.isPath([mapPos[0] + 1, mapPos[1]]) && this.gameMap.isBomb([mapPos[0] + 1, mapPos[1]]) === false ) {
	      mapPos = [mapPos[0] + 1, mapPos[1]];
	      this.previousDirection = 'right';
	      return { direction: 'right', mapPos: mapPos };
	    } else if (this.gameMap.isPath([mapPos[0] - 1, mapPos[1]]) && this.gameMap.isBomb([mapPos[0] - 1, mapPos[1]]) === false ) {
	      mapPos = [mapPos[0] - 1, mapPos[1]];
	      this.previousDirection = 'left';
	      return { direction: 'left', mapPos: mapPos };
	    }
	  }
	
	    setTimeout( () => { this.move(this.findAdjacentTile()); }, 200);
	};
	
	module.exports = Computer;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Tile = __webpack_require__(4);
	const Flame = __webpack_require__(5);
	const Computer = __webpack_require__(2);
	const Character = __webpack_require__(6);
	
	const gameOver = new Image();
	gameOver.src = './img/gameover.png';
	
	const bombImage = new Image();
	bombImage.src = './img/bomb.png';
	
	const bomber = new Image();
	bomber.src = './img/bomber.gif';
	
	const bomberInvinc = new Image();
	bomberInvinc.src = './img/bomber-invinc.png';
	
	const bomberDie = new Image();
	bomberDie.src = './img/bomber-die.png';
	
	const bomber2 = new Image();
	bomber2.src = './img/bomber2.gif';
	
	const bomber2Die = new Image();
	bomber2Die.src = './img/bomber2-die.png';
	
	const bomber2Invinc = new Image();
	bomber2Invinc.src = './img/bomber2-invinc.png';
	
	const bomber3 = new Image();
	bomber3.src = './img/bomber3.gif';
	
	const bomber3Die = new Image();
	bomber3Die.src = './img/bomber3-die.png';
	
	const bomber3Invinc = new Image();
	bomber3Invinc.src = './img/bomber3-invinc.png';
	
	const bomber4 = new Image();
	bomber4.src = './img/bomber4.gif';
	
	const bomber4Die = new Image();
	bomber4Die.src = './img/bomber4-die.png';
	
	const bomber4Invinc = new Image();
	bomber4Invinc.src = './img/bomber4-invinc.png';
	
	const tile = new Image();
	tile.src = './img/tile.png';
	
	const wall = new Image();
	wall.src = './img/wall.png';
	
	const flameImage = new Image();
	flameImage.src = './img/flame.gif';
	
	const blockImage = new Image();
	blockImage.src = './img/block.png';
	
	const flamePowerup = new Image();
	flamePowerup.src = './img/flamePowerup.png';
	
	const bombPowerup = new Image();
	bombPowerup.src = './img/bombPowerup.png';
	
	const speedPowerup = new Image();
	speedPowerup.src = './img/speedPowerup.png';
	
	const scorebarAvatars = new Image();
	scorebarAvatars.src = './img/scorebar-avatars.png';
	
	const audioOptions = new Image();
	audioOptions.src = './img/audio-options.png';
	
	const flameCenter = new Image();
	flameCenter.src = './img/flamecenter.png';
	
	const flameRight = new Image();
	flameRight.src = './img/flameright.png';
	
	const flameTop = new Image();
	flameTop.src = './img/flametop.png';
	
	const flameLeft = new Image();
	flameLeft.src = './img/flameleft.png';
	
	const flameBottom = new Image();
	flameBottom.src = './img/flamebottom.png';
	
	const explosion = new Audio();
	explosion.src = './sounds/explosion.mp3';
	explosion.volume = 0.3;
	
	const dropbomb = new Audio();
	dropbomb.src = './sounds/dropbomb.mp3';
	dropbomb.volume = 0.3;
	
	const powerup = new Audio();
	powerup.src = './sounds/powerup.mp3';
	powerup.volume = 0.2;
	
	const goonies = new Audio();
	goonies.src = './sounds/goonies.mp3';
	
	const solar = new Audio();
	solar.src = './sounds/solar-jetman.mp3';
	
	const evergreen = new Audio();
	evergreen.src = './sounds/evergreen.mp4';
	
	const playlist = [goonies, solar];
	
	const bomberImages = {
	  1: { alive: bomber, invincible: bomberInvinc, dead: bomberDie },
	  2: { alive: bomber2, invincible: bomber2Invinc, dead: bomber2Die },
	  3: { alive: bomber3, invincible: bomber3Invinc, dead: bomber3Die },
	  4: { alive: bomber4, invincible: bomber4Invinc, dead: bomber4Die }
	};
	
	const flameImages = {
	  'center': flameCenter,
	  'left': flameLeft,
	  'top': flameTop,
	  'right': flameRight,
	  'bottom': flameBottom
	};
	
	const player1 = {
	  'up': 4,
	  'right': 58,
	  'down': 114,
	  'left': 169
	};
	
	const player2 = {
	  'up': 4,
	  'right': 58,
	  'down': 114,
	  'left': 169
	};
	
	var GameMap = function (musicOn, numPlayers) {
	  this.soundOn = true;
	  this.numPlayers = numPlayers;
	
	  this.musicOn = musicOn;
	  this.currentAudio = null;
	  this.tiles = [];
	  this.characters = [];
	  this.tileSize = 16;
	  this.initialize();
	  this.generateBlocks();
	  if (this.musicOn) {
	    this.playMusic();
	  }
	  this.bombs = [];
	  this.flames = [];
	  this.powerups = [];
	  this.time = 0;
	  this.winner = null;
	  this.p1Lives = 3;
	  this.p2Lives = 3;
	  this.p3Lives = 3;
	  this.p4Lives = 3;
	  this.losers = [];
	
	  document.onkeydown = (e) => {
	    if (e.key === 't') {
	      if (this.currentAudio.paused) {
	        this.musicOn = true;
	        this.currentAudio.play();
	      } else {
	        this.musicOn = false;
	        this.currentAudio.pause();
	      }
	    }
	    if (e.key ==='y') {
	      this.toggleSoundEffects();
	    }
	  };
	};
	
	GameMap.DIM_X = 272;
	
	GameMap.DIM_Y = 228;
	
	GameMap.prototype.toggleSoundEffects = function () {
	  if (this.soundOn) {
	    explosion.volume = 0;
	    dropbomb.volume = 0;
	    powerup.volume = 0;
	    this.soundOn = false;
	  } else {
	    explosion.volume = 0.3;
	    dropbomb.volume = 0.3;
	    powerup.volume = 0.1;
	    this.soundOn = true;
	  }
	};
	
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
	
	GameMap.prototype.playMusic = function () {
	  let id = Math.floor(Math.random() * 2);
	  this.currentAudio = playlist[id];
	  this.currentAudio.play();
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
	
	GameMap.prototype.addCharacter3 = function () {
	  var character3 = new Character([18, 178], this, 3);
	  this.characters.push(character3);
	  return character3;
	};
	
	GameMap.prototype.addCharacter4 = function () {
	  var character4 = new Character([242, 178], this, 4);
	  this.characters.push(character4);
	  return character4;
	};
	
	GameMap.prototype.addComputer1 = function () {
	  var computer1 = new Computer([242, 18], this, 2);
	  this.characters.push(computer1);
	  return computer1;
	};
	
	GameMap.prototype.getBomb = function (pos) {
	  return this.bombs[this.isBomb(pos)];
	};
	
	GameMap.prototype.addBomb = function (bomb) {
	  dropbomb.currentTime = 0;
	  dropbomb.play();
	  this.bombs.push(bomb);
	};
	
	GameMap.prototype.renderBombs = function (ctx) {
	  this.bombs.forEach( (bomb, index) => {
	    if (bomb.time <= bomb.explodeTime) {
	      let sx = bomb.frame * 16;
	      ctx.drawImage(bombImage, sx, 0, 16, 16, bomb.mapPos[0] * this.tileSize, bomb.mapPos[1] * this.tileSize + 20, 16, 16);
	    } else {
	      explosion.currentTime = 0;
	      explosion.play();
	      this.removeBomb(index);
	    }
	  });
	};
	
	GameMap.prototype.renderCharacters = function (ctx) {
	  for (var i = 0; i < this.characters.length; i++) {
	    let character = this.characters[i];
	    let characterImage, sy;
	    let dieOffset = 0;
	    let sx = character.frame * 17 + player1[character.faceDirection()];
	    if (character.invincible && character.alive === false) {
	      sy = 25;
	      sx = character.dieFrame * 28;
	      dieOffset = 11;
	      characterImage = bomberImages[character.playerNum].dead;
	    } else if (character.invincible) {
	      sy = this.time % 2 === 0 ? 23 : 0;
	      characterImage = bomberImages[character.playerNum].invincible;
	    } else if (character.alive) {
	      sy = 23;
	      characterImage = bomberImages[character.playerNum].alive;
	    }
	
	    ctx.drawImage(characterImage, sx, 0, 17 + dieOffset, sy, character.pos[0] - 2 - dieOffset/1.6 ,character.pos[1] + 8, 17 + dieOffset, 23 + dieOffset / 5);
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
	  ctx.fillStyle = '#E8E2D8';
	  ctx.fillRect(0, 0, 272, 228);
	  ctx.drawImage(scorebarAvatars, 0, 0, 13, 11, 5,5, 13, 11);
	  ctx.drawImage(scorebarAvatars, 13, 0, 13, 11, 50 ,5, 13, 11);
	  ctx.drawImage(scorebarAvatars, 26, 0, 13, 11, 190,5, 13, 11);
	  ctx.drawImage(scorebarAvatars, 39, 0, 13, 11, 238 ,5, 13, 11);
	  ctx.strokeText(`x ${this.p1Lives}`,20, 14);
	  ctx.strokeText(`x ${this.p2Lives}`,65, 14);
	  ctx.strokeText(`x ${this.p3Lives}`,205, 14);
	  ctx.strokeText(`x ${this.p4Lives}`,253, 14);
	
	  let musicSx = 0;
	  let soundSx = 0;
	
	  if (!this.musicOn) {
	    musicSx = 17;
	  }
	
	  if (!this.soundOn) {
	    soundSx = 17;
	  }
	
	  ctx.drawImage(audioOptions, musicSx, 0, 16, 16, 120, 3, 12, 12);
	  ctx.drawImage(audioOptions, soundSx, 16, 16, 16, 140, 3, 12, 12);
	};
	
	GameMap.prototype.renderGameOver = function (ctx) {
	
	  let sx = (this.checkWinner() - 1) * 272;
	  ctx.drawImage(gameOver, sx, 0, 272, 195, 0, 0, 272, 228);
	  if (this.musicOn) {
	    this.currentAudio.pause();
	    evergreen.play();
	  }
	
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
	
	GameMap.prototype.checkWinner = function () {
	  if (this.numPlayers === 1) {
	    return this.characters[0].playerNum;
	  } else {
	    return false;
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
	  return !this.tiles[pos[1]][pos[0]].safe;
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
	
	GameMap.prototype.isPlayer = function (pos, playerNum) {
	  let posX = pos[0];
	  let posY = pos[1];
	  let isCharacter = false;
	  this.characters.forEach( (character, index) => {
	
	    let characterMapPos = character.getMapBombPos(pos);
	    let characterMapPosX = characterMapPos[0];
	    let characterMapPosY = characterMapPos[1];
	    if (characterMapPosX === posX && characterMapPosY === posY && playerNum !== this.characters[index].playerNum) {
	      isCharacter = index;
	    }
	  });
	  return isCharacter;
	};
	
	GameMap.prototype.destroyBlock = function (pos) {
	  this.tiles[pos[1]][pos[0]].animateDestroy();
	};
	
	
	GameMap.prototype.isLeftPathUnsafe = function (character) {
	  let centerPos = character.centerPos();
	  centerPos[0] -= 6;
	  let mapCenterPos = character.getMapPos(centerPos);
	
	  return this.isUnsafe([mapCenterPos[0], mapCenterPos[1]]);
	};
	
	GameMap.prototype.isRightPathUnsafe = function (character) {
	  let centerPos = character.centerPos();
	  centerPos[0] += 4;
	  let mapCenterPos = character.getMapPos(centerPos);
	
	  return this.isUnsafe([mapCenterPos[0], mapCenterPos[1]]);
	};
	
	GameMap.prototype.isTopPathUnsafe = function (character) {
	  let centerPos = character.centerPos();
	  centerPos[1] -= 5;
	  let mapCenterPos = character.getMapPos(centerPos);
	
	  return this.isUnsafe([mapCenterPos[0], mapCenterPos[1]]);
	};
	
	GameMap.prototype.isBottomPathUnsafe = function (character) {
	  let centerPos = character.centerPos();
	  centerPos[1] += 5;
	  let mapCenterPos = character.getMapPos(centerPos);
	
	  return this.isUnsafe([mapCenterPos[0], mapCenterPos[1]]);
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
	
	  if (gameTile.type === 'block' && gameTile.powerup === null) {
	    gameTile.type = 'path';
	  } else if (gameTile.type === 'path' && gameTile.power !== null) {
	    gameTile.powerup = null;
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
	  } else if (this.tiles[pos[1]][pos[0]].powerup === 'speed' && character.speed < 1.4) {
	    if (this.computer === true && character.playerNum === 1) {
	      character.speed += 0.1;
	    } else if (this.computer === false && character.playerNum <= 2) {
	      character.speed += 0.1;
	    }
	  }
	  powerup.currentTime = 0;
	  powerup.play();
	  this.tiles[pos[1]][pos[0]].powerup = null;
	};
	
	GameMap.prototype.decrementLives = function (playerNum) {
	  if (playerNum === 1) {
	    this.p1Lives -= 1;
	  } else if (playerNum === 2) {
	    this.p2Lives -= 1;
	  } else if (playerNum === 3) {
	    this.p3Lives -= 1;
	  } else if (playerNum === 4) {
	    this.p4Lives -= 1;
	  }
	};
	
	GameMap.prototype.removeCharacter = function (index) {
	  let character = this.characters[index];
	  if (character.lives > 1) {
	
	    character.animateDie();
	    this.decrementLives(character.playerNum);
	
	    setTimeout(() => {
	      this.respawnCharacter(character, index);
	    }, 500);
	  } else {
	
	    this.decrementLives(character.playerNum);
	    character.animateDie();
	
	
	    setTimeout(() => {
	      this.losers.push(character.playerNum);
	      this.numPlayers -= 1;
	      this.characters.splice(index, 1);
	    }, 500);
	  }
	};
	
	GameMap.prototype.findCharacterByNum = function (num) {
	  for (var i = 0; i < this.characters.length; i++) {
	    if (this.characters[i].playerNum === num) {
	      return i;
	    }
	  }
	};
	
	GameMap.prototype.respawnCharacter  = function (character, index) {
	  let id = this.findCharacterByNum(character.playerNum);
	  this.characters.splice(id, 1);
	  setTimeout( () => {
	    character.invincible = true;
	    character.alive = true;
	    this.characters.push(character);
	    setTimeout( () => { character.invincible = false; }, 2000);
	  }, 1000);
	};
	
	GameMap.prototype.drawFrame = function (ctx) {
	
	  ctx.clearRect(0, 0, GameMap.DIM_X, GameMap.DIM_Y);
	  if (this.checkWinner() === false) {
	    this.checkCharacter();
	    this.renderScoreBar(ctx);
	    this.renderMap(ctx);
	    this.renderBombs(ctx);
	    this.renderFlames(ctx);
	    this.renderCharacters(ctx);
	  } else {
	    this.renderGameOver(ctx);
	  }
	};
	
	GameMap.prototype.bottomLeftEmpty = function (i, j) {
	  if (this.numPlayers >= 3) {
	    return (i > 9 && j < 3);
	  }
	};
	
	GameMap.prototype.bottomRightEmpty = function (i, j) {
	  if (this.numPlayers === 4) {
	    return (i > 9 && j > 13);
	  }
	};
	
	GameMap.prototype.generateBlocks = function () {
	  for (var i = 0; i < this.tiles.length; i++) {
	    for (var j = 0; j < this.tiles[i].length; j++) {
	      if ((i < 3 && j < 3) || (j > 13 && i < 3) || this.bottomRightEmpty(i, j) || this.bottomLeftEmpty(i, j)) {
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
/* 4 */
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
/* 5 */
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
	  this.frameIntervalId = setInterval( ()=> { this.frame += 1; }, 90 );
	};
	
	
	Flame.prototype.extinguish = function () {
	  clearInterval(this.refreshIntervalId);
	  clearInterval(this.frameIntervalId);
	};
	
	
	
	
	
	
	
	module.exports = Flame;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Bomb = __webpack_require__(7);
	
	var Character = function (pos, gameMap, playerNum) {
	  this.pos = pos;
	  this.gameMap = gameMap;
	  this.playerNum = playerNum;
	
	  this.alive = true;
	  this.invincible = false;
	  this.lives = 3;
	  this.vel = [0,0];
	  this.speed = 1;
	  this.strength = 1;
	  this.numBombs = 1;
	  this.activeBombs = 0;
	  this.moving = false;
	  this.movingLeft = false;
	  this.movingTop = false;
	  this.movingRight = false;
	  this.movingBottom = false;
	  this.facing = 'down';
	  this.actualVel = [0,0];
	  this.frame = 0;
	  this.dieFrame = 0;
	  this.bombId = 0;
	
	  this.computer = false;
	};
	
	Character.prototype.animateDie = function () {
	  this.lives -= 1;
	  this.alive = false;
	  this.invincible = true;
	  this.dieFrame = 0;
	  this.dieIntervalId = setInterval(() => {
	    this.dieFrame += 1;
	  }, 100);
	
	  setTimeout( () => { clearInterval(this.dieInterval); }, 500);
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
	    this.incrementFrame();
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
	
	  let currentMapPos = this.getMapBombPos(this.pos);
	  let leftMapPos = [currentMapPos[0] - 1, currentMapPos[1]];
	  let bombIndex = this.gameMap.isBomb(topLeftMapPos);
	
	  if (this.gameMap.isPath(topLeftMapPos) && this.gameMap.isPath(bottomLeftMapPos)) {
	    if (this.gameMap.isBomb(currentMapPos) === false && bombIndex !== false) {
	      return true;
	    } else if (topLeftMapPos[0] === leftMapPos[0] && bombIndex !== false && !this.gameMap.getBomb(topLeftMapPos).isPlayerBomb(this.bombId, this.playerNum)) {
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
	
	  let currentMapPos = this.getMapBombPos(this.pos);
	
	  let rightMapPos = [currentMapPos[0] + 1, currentMapPos[1]];
	
	  if (this.gameMap.isPath(topRightMapPos) && this.gameMap.isPath(bottomRightMapPos)) {
	    if (this.gameMap.isBomb(currentMapPos) === false && this.gameMap.isBomb(topRightMapPos) !== false) {
	        return true;
	    } else if (topRightMapPos[0] === rightMapPos[0] && this.gameMap.isBomb(topRightMapPos) !== false && !this.gameMap.getBomb(topRightMapPos).isPlayerBomb(this.bombId, this.playerNum)) {
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
	
	  let currentMapPos = this.getMapBombPos(this.pos);
	
	  let topMapPos = [currentMapPos[0], currentMapPos[1] - 1];
	
	  if (this.gameMap.isPath(topLeftMapPos) && this.gameMap.isPath(topRightMapPos)) {
	    if (this.gameMap.isBomb(currentMapPos) === false && this.gameMap.isBomb(topLeftMapPos) !== false) {
	      return true;
	    } else if (topRightMapPos[1] === topMapPos[1] && this.gameMap.isBomb(topLeftMapPos) !== false && !this.gameMap.getBomb(topLeftMapPos).isPlayerBomb(this.bombId, this.playerNum)) {
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
	
	  let currentMapPos = this.getMapBombPos(this.pos);
	
	  let bottomMapPos = [currentMapPos[0], currentMapPos[1] + 1];
	
	  if (this.gameMap.isPath(bottomLeftMapPos) && this.gameMap.isPath(bottomRightMapPos) ) {
	    if (this.gameMap.isBomb(currentMapPos) === false && this.gameMap.isBomb(bottomLeftMapPos) !== false) {
	      return true;
	    } else if (bottomLeftMapPos[1] === bottomMapPos[1] && this.gameMap.isBomb(bottomLeftMapPos) !== false && !this.gameMap.getBomb(bottomLeftMapPos).isPlayerBomb(this.bombId, this.playerNum)) {
	      return true;
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
	  if (this.alive) {
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
	  deltaX = parseFloat(deltaX.toFixed(1));
	  deltaY = parseFloat(deltaY.toFixed(1));
	
	
	  this.actualVel = [deltaX, deltaY];
	  let futurePosX = currentPos[0] + deltaX;
	  let futurePosY = currentPos[1] + deltaY;
	
	  futurePos = [futurePosX, futurePosY];
	  this.pos = futurePos;
	  }
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
	  this.movingTop = true;
	  this.startMoving();
	};
	
	Character.prototype.stopMoveUp = function () {
	  if (!this.movingBottom) {
	    this.vel[1] = 0;
	  }
	  this.movingTop = false;
	  this.stopMoving();
	};
	
	Character.prototype.moveDown = function () {
	  this.vel[1] = 1 * this.speed;
	  this.movingBottom = true;
	  this.startMoving();
	};
	
	Character.prototype.stopMoveDown = function () {
	  if (!this.movingTop) {
	    this.vel[1] = 0;
	  }
	  this.movingBottom = false;
	  this.stopMoving();
	};
	
	Character.prototype.moveRight = function () {
	  this.vel[0] = 1 * this.speed;
	  this.movingRight = true;
	  this.startMoving();
	};
	
	Character.prototype.stopMoveRight = function () {
	  if (!this.movingLeft) {
	    this.vel[0] = 0;
	  }
	  this.movingRight = false;
	  this.stopMoving();
	};
	
	Character.prototype.moveLeft = function () {
	  this.vel[0] = -1 * this.speed;
	  this.movingLeft = true;
	  this.startMoving();
	};
	
	Character.prototype.stopMoveLeft = function () {
	  if (!this.movingRight) {
	    this.vel[0] = 0;
	  }
	  this.movingLeft = false;
	  this.stopMoving();
	};
	
	Character.prototype.dropBomb = function () {
	  let mapPos = this.getMapBombPos(this.pos);
	  if (this.activeBombs < this.numBombs && this.alive && this.gameMap.isBomb(mapPos) === false) {
	    this.activeBombs += 1;
	    var bomb = new Bomb(mapPos, this.strength, this.gameMap, this.bombId, this.playerNum);
	    this.bombId += 1;
	    this.gameMap.addBomb(bomb);
	    setTimeout( () => {
	      this.activeBombs -= 1;
	    }, 2000);
	  }
	};
	
	
	module.exports = Character;


/***/ },
/* 7 */
/***/ function(module, exports) {

	var Bomb = function (mapPos, strength, gameMap, bombId, playerNum) {
	  this.mapPos = mapPos;
	  this.strength = strength;
	  this.gameMap = gameMap;
	  this.bombId = bombId;
	  this.playerNum = playerNum;
	
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
	
	
	Bomb.prototype.isPlayerBomb = function (bombId, playerNum) {
	  return bombId === this.bombId && this.playerNum === playerNum;
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
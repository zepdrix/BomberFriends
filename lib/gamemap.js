const Tile = require('./tile');
const Flame = require('./flame');
const Computer = require('./computer');
const Character = require('./character');

var gameOver = new Image();
gameOver.src = './img/gameover.png';
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

var explosion = new Audio();

explosion.src = './sounds/explosion.mp3';
explosion.volume = 0.3;

var dropbomb = new Audio();
dropbomb.src = './sounds/dropbomb.mp3';
dropbomb.volume = 0.3;

var powerup = new Audio();
powerup.src = './sounds/powerup.mp3';
powerup.volume = 0.7;

var goonies = new Audio();
goonies.src = './sounds/goonies.mp3';
var solar = new Audio();
solar.src = './sounds/solar-jetman.mp3';



var playlist = [goonies, solar];

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



var GameMap = function (soundOn, numPlayers) {
  this.soundOn = soundOn;
  this.numPlayers = numPlayers;

  this.currentAudio = null;
  this.tiles = [];
  this.characters = [];
  this.tileSize = 16;
  this.initialize();
  this.generateBlocks();
  if (this.soundOn) {
    this.playMusic();
  }
  this.bombs = [];
  this.flames = [];
  this.powerups = [];
  this.time = 0;
  this.winner = null;
  this.p1Lives = 2;
  this.p2Lives = 2;
  this.losers = [];

  document.onkeydown = (e) => {
    if (e.key === 't') {
      if (this.currentAudio.paused) {
        this.currentAudio.play();
      } else {
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
    powerup.volume = 0.7;
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


GameMap.prototype.addComputer1 = function () {
  var computer1 = new Computer([242, 18], this, 2);
  this.characters.push(computer1);
  return computer1;
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
  ctx.fillStyle = '#E8E2D8';
  ctx.fillRect(0, 0, 272, 228);
  ctx.drawImage(scorebarAvatars, 0, 0, 13, 11, 5,5, 13, 11);
  ctx.drawImage(scorebarAvatars, 13, 0, 13, 11, 238 ,5, 13, 11);
  ctx.strokeText(`x ${this.p1Lives}`,20, 14);
  ctx.strokeText(`x ${this.p2Lives}`,253, 14);
};

GameMap.prototype.renderGameOver = function (ctx) {
  if (this.checkWinner() !== false) {
    // debugger
    let sx = (this.checkWinner() - 1) * 272;
    ctx.drawImage(gameOver, sx, 0, 272, 195, 0, 0, 272, 228);
    // ctx.drawImage(gameOver, sx, 0, 0, 0);
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
    debugger
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
  powerup.currentTime = 0;
  powerup.play();
  this.tiles[pos[1]][pos[0]].powerup = null;
};

GameMap.prototype.removeCharacter = function (index) {
  let character = this.characters[index];
  if (character.lives > 1) {
    character.lives -= 1;
    if (character.playerNum === 1) {
      this.p1Lives -= 1;
    } else {
      this.p2Lives -= 1;
    }
    character.alive = false;
    this.respawnCharacter(character, index);
  } else {

    this.losers.push(character.playerNum);
    this.numPlayers -= 1;
    this.characters.splice(index, 1);
  }
};

GameMap.prototype.respawnCharacter  = function (character, index) {
  this.characters.splice(index, 1);
  setTimeout( () => {
    character.invincible = true;
    character.alive = true;
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
  this.renderGameOver(ctx);
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

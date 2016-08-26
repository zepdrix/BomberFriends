const Tile = require('./tile');
const Flame = require('./flame');
const Character = require('./character');

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
var bombPowerup = new Image();
bombPowerup.src = './img/bombPowerup.png';

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
};

GameMap.DIM_X = 272;

GameMap.DIM_Y = 208;

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
      } else if (this.tiles[i][j].powerup === 'bomb') {
        ctx.drawImage(bombPowerup, xCoord, yCoord);
      } else {
        ctx.drawImage(tile, xCoord, yCoord);
      }
      xCoord += size;
    }
    yCoord += size;
    xCoord = 0;
  }
};
GameMap.prototype.onBomb = function (pos) {
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
  this.tiles[pos[1]][pos[0]].type = 'path';
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


GameMap.prototype.renderCharacters = function (ctx) {
  for (var i = 0; i < this.characters.length; i++) {
    if (this.characters[i].playerNum === 1) {
      let character1 = this.characters[i];
      let sx = character1.frame * 17 + player1[character1.faceDirection()];

      ctx.drawImage(bomber, sx, 0, 17, 23, character1.pos[0]-1 ,character1.pos[1]-12, 17, 23);
    } else if (this.characters[i].playerNum === 2) {
      let character2 = this.characters[i];
      let sx = character2.frame * 17 + player1[character2.faceDirection()];
      ctx.drawImage(bomber2, sx, 0, 17, 23, character2.pos[0]-1 ,character2.pos[1]-12, 17, 23);
    }
  }
};

GameMap.prototype.makeFlame = function (pos) {
  let gameTile = this.tiles[pos[1]][pos[0]];
  gameTile.safe = false;


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
  }
  this.tiles[pos[1]][pos[0]].powerup = null;
};

GameMap.prototype.isTouchingPowerup = function (character, index) {


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
        if (randomNum < 0.3) {
          this.tiles[i][j].powerup = 'flame';
        } else if (randomNum < 0.6) {
          this.tiles[i][j].powerup = 'bomb';
        }
      }
    }
  }
};


module.exports = GameMap;

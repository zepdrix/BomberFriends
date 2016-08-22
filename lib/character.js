const Bomb = require('./bomb');

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

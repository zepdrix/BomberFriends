var Bomb = function (mapPos, strength, gameMap) {
  this.mapPos = mapPos;
  this.strength = strength;
  this.gameMap = gameMap;

  this.time = 0;
  this.explodeTime = 2000;
  this.refreshIntervalId = setInterval( ()=> {this.time += 100;}, 100 );
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
  this.gameMap.makeFlame(this.mapPos);
};

Bomb.prototype.flameRight = function () {
  for (var i = 0; i < this.strength; i++) {
    let pos = [this.mapPos[0]+ 1 + i, this.mapPos[1]];
    if (this.gameMap.isPath(pos)) {
      this.gameMap.makeFlame(pos);
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
      this.gameMap.makeFlame(pos);
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
      this.gameMap.makeFlame(pos);
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
      this.gameMap.makeFlame(pos);
    } else if (this.gameMap.isBlock(pos)) {
      this.gameMap.destroyBlock(pos);
      break;
    } else {
      break;
    }
  }
};
module.exports = Bomb;

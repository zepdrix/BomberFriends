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

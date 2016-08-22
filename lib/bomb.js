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

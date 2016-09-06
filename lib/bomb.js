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
  this.flamePositions();
  this.gameMap.makeFlame(this.mapPos, 'center');
};


Bomb.prototype.flamePositions = function () {
  for (var i = 0; i < 4; i++) {
    let xVector, yVector, direction;
    
    if (i === 0) {
      xVector = 1;
      yVector = 0;
      direction = 'right';
    } else if (i === 1) {
      xVector = -1;
      yVector = 0;
      direction = 'left';
    } else if (i === 2) {
      xVector = 0;
      yVector = 1;
      direction = 'bottom';
    } else if (i === 3) {
      xVector = 0;
      yVector = -1;
      direction = 'top';
    }

    for (var j = 1; j <= this.strength; j++) {
      let last = false;
      let pos = [this.mapPos[0] + xVector * j, this.mapPos[1] + yVector * j];

      if (j === this.strength) {
        last = true;
      }

      if (this.gameMap.isPath(pos)) {
        this.gameMap.makeFlame(pos, direction, last);
      } else if (this.gameMap.isBlock(pos)) {
        this.gameMap.destroyBlock(pos);
        break;
      } else {
        break;
      }
    }
  }
};

module.exports = Bomb;

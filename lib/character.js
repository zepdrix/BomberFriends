const Bomb = require('./bomb');

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

Character.prototype.isPathBlocked = function (direction) {
  let coords = Character.COORDS.direction;
  let firstCoord = coords[0];
  let secondCoord = coords[1];
  let pixelOffset = coords[3] * this.speed;

  let firstPos = [this.pos[0] + firstCoord[0], this.pos[1] + firstCoord[1]];
  firstPos[coords[2]] += pixelOffset;
  let secondPos = [this.pos[0] + secondCoord[0], this.pos[1] + secondCoord[1]];
  secondPos[coords[2]] += pixelOffset;
  let currentMapPos = this.getMapBombPos(this.pos);
  let adjacentMapPos = [currentMapPos[0], currentMapPos[1]];
  adjacentMapPos[coords[2]] += coords[3];
  let bombIndex = this.gameMap.isBomb(firstPos);

  if (this.gameMap.isPath(firstPos) && this.gameMap.isPath(secondPos)) {
    if (this.gameMap.isBomb(currentMapPos) === false && bombIndex !== false) {
      return true;
    } else if (firstPos[0] === adjacentMapPos[0] && bombIndex !== false && !this.mapMap.getBomb(firstPos).isPlayerBomb(this.bombId, this.playerNum)) {
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
    if (this.isPathBlocked('left') && this.isPathBlocked('up') && this.isPathBlocked('right')) {
      if (deltaX > 0 || deltaX < 0) {
        deltaX = 0;
      }
    } else if (this.isPathBlocked('left') && this.isPathBlocked('up') && this.isPathBlocked('down')) {
      if (deltaY > 0 || deltaY < 0) {
        deltaY = 0;
      }
    } else if (this.isPathBlocked('left') && this.isPathBlocked('up')) {
      if (deltaX < 0) {
        deltaX = 0;
      }
      if (deltaY < 0) {
        deltaY = 0;
      }
    } else if (this.isPathBlocked('up') && this.isPathBlocked('right')) {
      if (deltaX > 0) {
        deltaX = 0;
      }
      if (deltaY < 0) {
        deltaY = 0;
      }
    } else if (this.isPathBlocked('right') && this.isPathBlocked('down')) {
      if (deltaX > 0) {
        deltaX = 0;
      }
      if (deltaY > 0) {
        deltaY = 0;
      }
    } else if (this.isPathBlocked('down') && this.isPathBlocked('left')) {
      if (deltaX < 0) {
        deltaX = 0;
      }
      if (deltaY > 0) {
        deltaY = 0;
      }
    } else if (this.isPathBlocked('left') && deltaX < 0) {
      deltaX = 0;
    } else if (this.isPathBlocked('right') && deltaX > 0) {
      deltaX = 0;
    } else if (this.isPathBlocked('up') && deltaY < 0) {
      deltaY = 0;
    } else if (this.isPathBlocked('down') && deltaY > 0) {
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

Character.COORDS = {
  'up': [[0, 0], [12, 0], 1, -1],
  'down': [[0, 12], [12, 12], 1, 1],
  'left': [[0, 0], [0, 12], 0, -1],
  'right': [[12, 0], [12, 12], 0, 1]
};

module.exports = Character;

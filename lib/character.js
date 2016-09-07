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

Character.prototype.isPathBlocked = function (direction) {
  let xVector = 0,
      yVector = 0;

  if (direction === 'right') {
    xVector = 12;
  } else if (direction === 'left') {
    xVector = 0;
  } else if (direction === 'up') {
    yVector = 1;
  } else if (direction === 'bottom') {
    yVector = -1;
  }

  let firstPosCheck = [this.pos[0] + xVector, this.pos[1] + yVector];

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

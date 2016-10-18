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
      this.gameMap.isBlock([mapPos[0] + 1, mapPos[1]]) || this.gameMap.isBlock([mapPos[0] - 1, mapPos[1]])) {
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

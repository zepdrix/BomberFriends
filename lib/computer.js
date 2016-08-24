

var Computer = function (character) {
  this.character = character;
  this.gameMap = character.gameMap;
  this.inDanger = false;
};

Computer.prototype.walkRight = function () {
  this.character.moveRight();
};

Computer.prototype.walkLeft = function () {
  this.character.moveLeft();
};

Computer.prototype.walkTop = function () {
  this.character.moveTop();
};

Computer.prototype.walkDown = function () {
  this.character.moveDown();
};


Computer.prototype.findValidDirection = function () {
  if (!this.character.isBottomPathBlocked()) {
    // while (!this.character.isBottomPathBlocked()) {
      this.walkDown();
    // }
  } else if (!this.character.isTopPathBlocked()) {
    // while (!this.character.isTopPathBlocked()) {
      this.walkTop();
    // }
  } else if (!this.character.isRightPathBlocked()) {
    // while (!this.character.isRightPathBlocked()) {
      this.walkRight();
    // }
  } else if (!this.character.isLeftPathBlocked()) {
    // while (!this.character.isLeftPathBlocked()) {
      this.walkLeft();
    // }
  } else {
    this.findValidDirection();
  }
};

Computer.prototype.avoidBomb = function () {

};

Computer.prototype.findBlock = function () {

};

Computer.prototype.startPlay = function () {
  this.findValidDirection();
};

module.exports = Computer;

const Computer = require('./computer');

var GameView = function (context, gameMap) {
  this.context = context;
  this.gameMap = gameMap;
  this.character1 = this.gameMap.addCharacter1();
  this.character2 = this.gameMap.addCharacter2();
  // this.computer = new Computer(this.character2);
};

GameView.prototype.bindKeyHandlers = function (character, character2) {
  onkeydown = function (e) {
    if (e.key ==='v') {
      character.dropBomb();
    }

    if (e.key === 'w') {
      character.moveUp();
    }

    if (e.key === 's') {
      character.moveDown();
    }

    if (e.key === 'd') {
      character.moveRight();
    }

    if (e.key === 'a') {
      character.moveLeft();
    }
    if (e.key ==='p') {
      character2.dropBomb();
    }

    if (e.key === 'i') {
      character2.moveUp();
    }

    if (e.key === 'k') {
      character2.moveDown();
    }

    if (e.key === 'l') {
      character2.moveRight();
    }

    if (e.key === 'j') {
      character2.moveLeft();
    }

  };
  onkeyup = function (e) {
    // if (e.key === 'a' || e.key === 'd') {
    //   character.move([0,0]);
    // }
    if (e.key === 'w') {
      character.stopMoveUp();
    }
    if (e.key === 's') {
      character.stopMoveDown();
    }
    if (e.key === 'd') {
      character.stopMoveRight();
    }
    if (e.key === 'a') {
      character.stopMoveLeft();
    }

    if (e.key === 'i') {
      character2.stopMoveUp();
    }
    if (e.key === 'k') {
      character2.stopMoveDown();
    }
    if (e.key === 'l') {
      character2.stopMoveRight();
    }

    if (e.key === 'j') {
      character2.stopMoveLeft();
    }

  };
};


GameView.prototype.start = function () {
  this.bindKeyHandlers(this.character1, this.character2);
  // this.computer.startPlay();
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function (time) {
  const timeDelta = time - this.lastTime;
  this.gameMap.step(time);
  this.gameMap.drawFrame(this.context);
  this.lastTime = time;
  requestAnimationFrame(this.animate.bind(this));
};



GameView.MOVES1 = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
  "v": 'bomb',
};

GameView.MOVES2 = {
  "i": [ 0, -1],
  "j": [-1,  0],
  "k": [ 0,  1],
  "l": [ 1,  0],
  "p": 'bomb'
};

module.exports = GameView;

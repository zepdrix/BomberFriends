const Computer = require('./computer');

var GameView = function (ctx, gameMap, computer = false) {

  this.context = ctx;
  this.gameMap = gameMap;
  this.character1 = this.gameMap.addCharacter1();
  this.character2 = this.gameMap.addCharacter2();
  this.character3 = this.gameMap.addCharacter3();
  this.character4 = this.gameMap.addCharacter4();

  this.computer = computer;

  if (computer) {
    this.computer1 = new Computer(this.character2);
    this.gameMap.computer = true;
  }

  this.computer2 = new Computer(this.character3);
  this.computer3 = new Computer(this.character4);
};

GameView.prototype.bindKeyHandlers = function (character, character2 = false) {
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

    if (!!character2) {
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

    }
  };

  onkeyup = function (e) {
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
    if (!!character2) {
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
    }
  };
};

GameView.prototype.start = function () {
  this.willAnimate = true;
  if (this.computer) {
    this.bindKeyHandlers(this.character1);
  } else {
    this.bindKeyHandlers(this.character1, this.character2);
  }
  this.lastTime = 0;
  if (this.willAnimate) {
    requestAnimationFrame(this.animate.bind(this));
  }
};

GameView.prototype.animate = function (time) {
  this.gameMap.step(time);

  // if (this.gameMap.time < time) {
    this.gameMap.drawFrame(this.context);
    // console.log(time);
  // }
  // this.lastTime = time;
  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;

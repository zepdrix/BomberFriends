var Tile = function (pos, type = 'path') {
  this.pos = pos;
  this.type = type;
  this.safe = true;
  this.powerup = null;
  this.time = 0;
  this.destroyTime = 200;
  this.frame = 0;
  // this.refreshIntervalId = null;
};

Tile.prototype.destroy = function () {
  if (this.time >= this.destroyTime) {
    clearInterval(this.refreshIntervalId);
    this.type = 'path';
  } else {

    this.time += 80;
    this.frame += 1;
  }

  console.log(this.frame);
};



Tile.prototype.animateDestroy = function () {

    this.refreshIntervalId = setInterval( () => { this.destroy(); }, 60 );

};


module.exports = Tile;

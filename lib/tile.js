var Tile = function (pos, type = 'path') {
  this.pos = pos;
  this.type = type;
  this.safe = true;
  this.powerup = null;
};


module.exports = Tile;

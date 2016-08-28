var Flame = function (mapPos, gameMap, orientation, last) {
  this.mapPos = mapPos;
  this.gameMap = gameMap;
  this.orientation = orientation;
  this.last = last;
  this.time = 0;
  this.frame = 0;
  this.extinguishTime = 500;
  this.refreshIntervalId = setInterval( ()=> { this.time += 100; }, 100 );
  this.frameIntervalId = setInterval( ()=> { this.frame += 1; }, 80 );
};


Flame.prototype.extinguish = function () {
  clearInterval(this.refreshIntervalId);
  clearInterval(this.frameIntervalId);
};







module.exports = Flame;

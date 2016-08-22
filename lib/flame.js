var Flame = function (mapPos, gameMap) {
  this.mapPos = mapPos;
  this.gameMap = gameMap;

  this.time = 0;
  this.extinguishTime = 500;
  this.refreshIntervalId = setInterval( ()=> {this.time += 100;}, 100 );
};


Flame.prototype.extinguish = function () {
  clearInterval(this.refreshIntervalId);
};







module.exports = Flame;

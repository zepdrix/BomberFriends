# BomberFriends
---
[BomberFriends Live]
[BomberFriends Live]: http://www.luyang.io/BomberFriends
BomberFriends is a game that is inspired by the Bomberman video game franchise.

The game allows players to control a character on a 2d grid map. All characters can drop bombs, which create flames that emanate from the bomb. The length of the flames are based on the 'strength' of the bomb, which can be improved by picking up a 'flame powerup'. The bombs and player character can be augmented by powerups that are revealed when a player destroys garbage 'blocks' that are randomly distributed throughout the map.

BomberFriends supports 2-player multiplayer from a single machine.
---
## The Map
---
The game's map tiles are arranged in a 2 dimensional array and rendered as a 17x13 square map. Characters, bombs, flames, tiles, blocks, and powerups are all stored in the GameMap class.

## Characters
---
Each character is an object that stores and updates its own map position. A human player controls the character and moves the character in the up, down, left, and right directions. Controls are very important for this game, avoiding bombs and picking up powerups needs to be precise, so efficient and smooth character control was a high priority. The map is arranged in a grid and characters can move freely in the 'corridors' where bombs and destructible blocks will obstruct movement. The control scheme allows for a player to input two movement directions (a horizontal and a vertical) and the path finding code will move the character in as many valid directions as possible. This allows for a character to 'fall' into a corridor when two directions are pressed so that a player won't have to be precise in positioning a character to move down a corridor.


## Animations
---
All animations come from sprite sheets that depict each frame of each object's animations. Any object that has animations is given an instance variable, this.frame, that specifies which frame to draw at any particular time. For example, when a bomb is dropped, it starts jiggling, as all bombs do, until it explodes. I've built this 'countdown animation' into the bomb's constructor function. As soon as it's initialized, the bomb's frame is cycles through the numbers 0 through 4, changing every 200 milliseconds:

```JavaScript
var Bomb = function (mapPos, strength, gameMap, bombId, playerNum) {
  this.mapPos = mapPos;
  this.strength = strength;
  this.gameMap = gameMap;
  this.bombId = bombId;
  this.playerNum = playerNum;

  this.time = 0;
  this.explodeTime = 2000;
  this.refreshIntervalId = setInterval( ()=> {
    this.time += 200;
    if (this.frame === 4) {
      this.frame = 0;
    } else {
      this.frame += 1;
    }
  }, 200 );
  this.frame = 0;
};

```

When the GameMap renders the bombs, it will check to see which frame the bomb is currently at, and display the appropriate image at the appropriate position on the map:

```JavaScript
GameMap.prototype.renderBombs = function (ctx) {
  this.bombs.forEach( (bomb, index) => {
    if (bomb.time <= bomb.explodeTime) {
      let sx = bomb.frame * 16;
      ctx.drawImage(bombImage, sx, 0, 16, 16, bomb.mapPos[0] * this.tileSize, bomb.mapPos[1] * this.tileSize + 20, 16, 16);
    } else {
      explosion.currentTime = 0;
      explosion.play();
      this.removeBomb(index);
    }
  });
};
```

In the renderBombs method, we are using the HTML canvas drawImage method with a sprite sheet called bombImage. This sprite sheet contains all the frames of animation, and since each frame is 16 pixels wide, we can select the correct image by specifying an sx (bomb.frame * 16), which is the x coordinate of the upperleft most corner of where we start to draw our image. We draw the corresponding bomb images as the frame changes

<img src="img/bomb.png" width="200">

More information about the drawImage method can be found [here].
[here]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
















---

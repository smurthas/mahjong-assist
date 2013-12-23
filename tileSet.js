var parseRack = require('./rack.js').parseRack;

function TileSet() {
  var tiles = parseRack('F F F F F F F F J J J J J J J J');
  for (var i = 0; i < 4; i++) {
    tiles = tiles.concat(parseRack('N E W S'));
    ['B', 'D', 'K'].forEach(function(suit) {
      for (var j = 1; j <= 9; j++) {
        tiles = tiles.concat(parseRack(j + suit));
      }
      tiles = tiles.concat(parseRack('D' + suit));
    });
  }
  this.tiles = tiles;
}

TileSet.prototype.drawTiles = function(count) {
  if (count > this.tiles.length) throw new Error('Tried to draw too many tiles');
  var tiles = [];
  for (var i = 0; i < count; i++) tiles.push(this.drawTile());
  return tiles;
};

TileSet.prototype.drawTile = function() {
  var index = Math.floor(Math.random() * this.tiles.length);
  return this.tiles.splice(index, 1)[0];
};

TileSet.prototype.removeTiles = function(tiles) {
  for (var i in tiles) {
    for (var j in this.tiles) {
      if (this.tiles[j].suit === tiles[i].suit && this.tiles[j].value === tiles[i].value) {
        this.tiles.splice(j, 1);
        break;
      }
    }
  }
}

module.exports = TileSet;

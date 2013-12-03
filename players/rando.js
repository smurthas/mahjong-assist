
function RandoPlayer(tiles) {
  this.tiles = tiles;
}

RandoPlayer.prototype.discard = function() {
  return this.tiles.splice(Math.floor(Math.random()*14), 1)[0];
}

module.exports = RandoPlayer;

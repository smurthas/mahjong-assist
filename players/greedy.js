
var lib = require('../lib.js');

function GreedyPlayer(tiles, card) {
  this.tiles = tiles;
  this.card = card;
}


GreedyPlayer.prototype.discard = function() {
  var counts = lib.countsForRack(this.card, this.tiles);
  var bestHand = counts[0];
  for (var i in this.tiles) {
    if (bestHand.matches[0].matched.indexOf(this.tiles[i]) === -1) {
      return this.tiles.splice(i, 1)[0];j
    }
  }
  console.log('I\'ve got mahjong!');
  return null;
}

module.exports = GreedyPlayer;

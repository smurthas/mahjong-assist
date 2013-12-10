
var lib = require('../lib.js');

function GreedyPlayer(tiles, card) {
  this.tiles = tiles;
  this.card = card;
}


GreedyPlayer.prototype.discard = function() {
  var counts = lib.countsForRack(this.card, this.tiles);
  var bestHand = counts[0];

  if (bestHand.matches[0].matched.length === 14) return null;
  for (var i in this.tiles) {
    // don't discard jokers as a simple rule
    if (this.tiles[i].suit === 'J') continue;

    // discard the first tile that doesn't count towards out best hand
    if (bestHand.matches[0].matched.indexOf(this.tiles[i]) === -1) {
      return this.tiles.splice(i, 1)[0];
    }
  }
  console.log('I\'ve got mahjong!');
  return null;
}

GreedyPlayer.prototype.onDiscard = function(tile) {
  this.tiles.push(tile);
  var counts = lib.countsForRack(this.card, this.tiles);
  this.tiles.pop();
  var bestHand = counts[0];
  var count = bestHand.matches[0].matched.length;
  if (count === 14) {
    return true;
  }
};

module.exports = GreedyPlayer;

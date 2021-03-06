
var lib = require('../lib.js');

function LockInPlayer(tiles, card) {
  this.tiles = tiles;
  this.card = card;
}


LockInPlayer.prototype.discard = function() {
  var matched;
  if (!this.chosenPermutation) {
    var counts = lib.countsForRack(this.card, this.tiles);
    this.chosenPermutation = counts[0].matches[0].permutation;
    matched = counts[0].matches[0].matched;
    //console.log('chose', this.chosenPermutation, matched);
  } else {
    matched = lib.checkAndSortPermutations(
        this.tiles, [this.chosenPermutation])[0].matched;
  }

  // mahjong!
  if (matched.length === 14) return null;

  for (var i in this.tiles) {
    // don't discard jokers as a simple rule
    if (this.tiles[i].suit === 'J') continue;

    if (matched.indexOf(this.tiles[i]) === -1) {
      return this.tiles.splice(i, 1)[0];j
    }
  }
  //console.log('I\'ve got mahjong!');
  return null;
}

LockInPlayer.prototype.onDiscard = function(tile) {
  if (!this.chosenPermutation) return;
  this.tiles.push(tile);
  var count = lib.checkAndSortPermutations(
        this.tiles, [this.chosenPermutation])[0].matched.length;
  this.tiles.pop();
  if (count === 14) {
    return true;
  }
};


module.exports = LockInPlayer;


var inspect = require('util').inspect;
var lib = require('../lib.js');
var TileSet = require('../tileSet.js');

function SmartyPlayer(tiles, card) {
  this.tiles = tiles;
  this.card = card;
  this.atLarge = new TileSet();
  // remove our tiles
  this.atLarge.removeTiles(this.tiles);
}

SmartyPlayer.prototype.take = function(tile) {
  this.tiles.push(tile);
  this.atLarge.removeTiles([tile]);
  console.error('this.atLarge', this.atLarge);
}

var discardSearchCount = 3;
SmartyPlayer.prototype.discard = function() {
  var counts = lib.countsForRack(this.card, this.tiles, this.atLarge.tiles);
  var bestHand = counts[0];

  if (bestHand.matches[0].matched.length === 14) return null;

  var topMatches = [];
  for (var i = 0; i < counts.length && i < discardSearchCount; i++) {
    topMatches.push(counts[i].matches[0]);
  }

  console.error('topMatches', inspect(topMatches));

  var nonMatchCounts = {};
  for (var i in this.tiles) {
    var nonMatchCount = 0;
    for (var j in topMatches) {
      if (topMatches[j].matched.indexOf(this.tiles[i]) === -1) nonMatchCount++;
    }
    nonMatchCounts[i] = nonMatchCount;
  }
  console.error('nonMatchCounts', nonMatchCounts);
  var worstIndex = Object.keys(nonMatchCounts).sort(function(i, j) {
    return nonMatchCounts[j] - nonMatchCounts[i];
  })[0];

  console.error('worstIndex', worstIndex);

  var discard = this.tiles.splice(worstIndex, 1)[0];
  console.error('discard', discard);
  return discard;


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

SmartyPlayer.prototype.onDiscard = function(tile) {
  this.tiles.push(tile);
  var counts = lib.countsForRack(this.card, this.tiles);
  this.tiles.pop();
  var bestHand = counts[0];
  var count = bestHand.matches[0].matched.length;
  if (count === 14) return true;
  this.atLarge.removeTiles([tile]);
};

module.exports = SmartyPlayer;

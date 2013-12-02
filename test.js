var _ = require('underscore');

var card = require('./cards/2013.js').hands;

var lib = require('./lib.js');

function printRack(rack, matchingTiles) {
  var topLine = '', bottomLine = '';

  var matchedIndices = [];
  if (matchingTiles) {
    matchingTiles.forEach(function(matchedTile) {
      for (var i in rack) {
        // already matched, skip it
        if (matchedIndices.indexOf(i) !== -1) continue;

        // values must match always
        if (rack[i].value !== matchedTile.value) continue;

        // suits must match
        if (rack[i].suit !== matchedTile.suit) continue;

        return matchedIndices.push(i);
      }
    });
  }

  for (var i in rack) {
    var suit = rack[i].suit;
    topLine += rack[i].value + (suit? suit : ' ') + ' ';
    if (matchedIndices.indexOf(i) !== -1) {
      bottomLine += '^';
      if (suit) bottomLine += '^';
      else bottomLine += ' ';
    } else {
      bottomLine += '  ';
    }
    bottomLine += ' ';
  }
  console.log(topLine);
  console.log(bottomLine);
}



function doCheck(row) {
  console.log('\n=========================================');
  console.log('[', row.title, ']');
  if (row.permutations) {
    if (typeof row.permutations === 'string') {
      row.permutations = lib.generatePermutations(row.permutations);
    }
    console.log(row.permutations.length);
    row.hands.forEach(function(rack) {
      var matchingSets = [];
      row.permutations.forEach(function(hand) {
        matchingSets.push({
          matched: lib.matchingTiles(rack, hand),
          hand: hand
        });
      });
      matchingSets.sort(function(a, b) {
        return b.matched.length - a.matched.length;
      });
      matchingSets.forEach(function(matchingSet) {
        printRack(matchingSet.hand);
        printRack(rack, matchingSet.matched);
      });
    });
    return;
  }
}

for (var i in card) {
  if (card[i].hand) card[i].hands = [card[i].hand];
  doCheck(card[i]);
}

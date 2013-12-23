var assert = require('assert');
var _ = require('underscore');
var Card = require('./card.js');
var parseRack = require('./rack.js').parseRack;

var _2013 = new Card(require('./cards/2013.js').hands);

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
      var matchingSets = lib.checkAndSortPermutations(rack, row.permutations);
      matchingSets.forEach(function(matchingSet) {
        printRack(matchingSet.hand);
        printRack(rack, matchingSet.matched);
      });
    });
    return;
  }
}

var rack = parseRack('F F 0 GD 1B 1B 2B 4K 7K 8D N W 5K 4B')
console.log(JSON.stringify(lib.countsForRack(_2013, rack),2,2));
//console.log(lib.countsForRack(_2013, rack));

/*for (var i in card) {
  if (card[i].hand) card[i].hands = [card[i].hand];
  doCheck(card[i]);
}*/

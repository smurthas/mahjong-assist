var _ = require('underscore');

var card = require('./cards/2013.js').hands;

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

        matchedIndices.push(i);
      }
    });
  }

  for (var i in rack) {
    var suit = rack[i].suit;
    topLine += rack[i].value + (suit? suit : ' ') + ' ';
    if (matchedIndices.indexOf(i) !== -1) {
      bottomLine += '^';
      if (suit) bottomLine += '^';
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
  for (var i in row.hands) {
    if (row.count) {
      row.check = function() {
        var counts = row.count([].concat(row.hands[i]));
        for (var suit in counts) {
          var bestCountsSet = _.values(counts)[0];
          bestCountsSet.forEach(function(bestCounts) {
            var matchedTiles = bestCounts.tiles;
            printRack(row.hands[i], matchedTiles);
          });
          if (counts[suit][0]._total === 14) return true;
        }
        return false;
      };
    }

    var failed = false;
    try {
      failed = !row.check(row.hands[i]);
    } catch(err) {
      failed = err;
    }
    if (failed) {
      console.log('"%s" doesn\'t match.', row.title);
      if (failed instanceof Error) throw failed;
    }
  }
}

for (var i in card) {
  if (card[i].hand) card[i].hands = [card[i].hand];
  doCheck(card[i]);
}

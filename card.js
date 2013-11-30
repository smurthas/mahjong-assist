var _ = require('underscore');

var lib = require('./lib');


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

var card = {
  '11 222 3333 4444 55 or 55 666 7777 888 99': {
    count: function(hand) {
      var counts = {};
      var bySuit = lib.binBySuit(hand);
      for (var suit in bySuit) {
        counts[suit] = [];
        counts[suit].push(lib.matchingCountOfCountsByValue(hand,
          { 1: 2, 2: 3, 3: 4, 4: 3, 5: 2}));
        counts[suit].push(lib.matchingCountOfCountsByValue(hand,
          { 5: 2, 6: 3, 7: 4, 8: 3, 9: 2 }));
        counts[suit].sort(function(a, b) { return b._total - a._total; });
      }
      return counts;
    },
    hands: [
      [
        { value: 5, suit: 'B' },
        { value: 5, suit: 'B' },

        { value: 6, suit: 'B' },
        { value: 6, suit: 'B' },
        { value: 6, suit: 'B' },

        { value: 7, suit: 'B' },
        { value: 7, suit: 'B' },
        { value: 7, suit: 'B' },
        { value: 7, suit: 'B' },

        { value: 8, suit: 'B' },
        { value: 8, suit: 'B' },
        { value: 8, suit: 'B' },

        { value: 9, suit: 'B' },
        { value: 9, suit: 'B' }
      ],
      [
        { value: 1, suit: 'K' },
        { value: 1, suit: 'K' },

        { value: 2, suit: 'K' },
        { value: 2, suit: 'K' },
        { value: 2, suit: 'K' },

        { value: 3, suit: 'K' },
        { value: 3, suit: 'K' },
        { value: 3, suit: 'K' },
        { value: 3, suit: 'K' },

        { value: 4, suit: 'K' },
        { value: 4, suit: 'K' },
        { value: 4, suit: 'K' },

        { value: 5, suit: 'K' },
        { value: 5, suit: 'K' }
      ]
    ]
  },
  '11 333 5555 777 99': {
    check: function(hand) {
      if (Object.keys(lib.countsBySuit(hand)).length !== 1) return false;
      return lib.matchesCountsByValue(hand, { 1: 2, 3: 3, 5: 4, 7: 3, 9: 2 });
    },
    count: function(hand) {
      var bySuit = lib.binBySuit(hand);
      var counts = {};
      for (var suit in bySuit) {
        counts[suit] = [lib.matchingCountOfCountsByValue(bySuit[suit],
          { 1: 2, 3: 3, 5: 4, 7: 3, 9: 2})];
      }
      return counts;
    },
    hand: [
      { value: 1, suit: 'B' },
      { value: 1, suit: 'B' },

      { value: 3, suit: 'B' },
      { value: 3, suit: 'B' },
      { value: 3, suit: 'B' },

      { value: 5, suit: 'B' },
      { value: 5, suit: 'B' },
      { value: 5, suit: 'B' },
      { value: 5, suit: 'B' },

      { value: 7, suit: 'B' },
      { value: 7, suit: 'B' },
      { value: 7, suit: 'B' },

      { value: 9, suit: 'B' },
      { value: 9, suit: 'B' }
    ]
  },
  '22 444 DDDD 6666 88': {
    check: function(hand) {
      if (Object.keys(lib.countsBySuit(hand)).length !== 1) return false;
      return lib.matchesCountsByValue(hand,
          { 2: 2, 4: 3, D: 4, 6: 3, 8: 2 });
    },
    count: function(hand) {
      var bySuit = lib.binBySuit(hand);
      var counts = {};
      for (var suit in bySuit) {
        counts[suit] = [lib.matchingCountOfCountsByValue(bySuit[suit],
          { 2: 2, 4: 3, D: 4, 6: 3, 8: 2 })];
      }
      return counts;
    },
    hand: [
      { value: 2, suit: 'B' },
      { value: 2, suit: 'B' },

      { value: 4, suit: 'B' },
      { value: 4, suit: 'B' },
      { value: 4, suit: 'B' },

      { value: 'D', suit: 'B' },
      { value: 'D', suit: 'B' },
      { value: 'D', suit: 'B' },
      { value: 'D', suit: 'B' },

      { value: 6, suit: 'B' },
      { value: 6, suit: 'B' },
      { value: 6, suit: 'B' },

      { value: 8, suit: 'B' },
      { value: 8, suit: 'B' }
    ]
  },
  'FF 11 22 33 44 55 DD': {
    check: function(hand) {
      if (Object.keys(lib.countsBySuit(hand)).length !== 2) return false;
      return lib.matchesCountsByValue(hand, { F: 2, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, D: 2 });
    },
    hand: [
      { value: 'F' },
      { value: 'F' },

      { value: 1, suit: 'B' },
      { value: 1, suit: 'B' },

      { value: 2, suit: 'B' },
      { value: 2, suit: 'B' },

      { value: 3, suit: 'B' },
      { value: 3, suit: 'B' },

      { value: 4, suit: 'B' },
      { value: 4, suit: 'B' },

      { value: 5, suit: 'B' },
      { value: 5, suit: 'B' },

      { value: 'D', suit: 'B' },
      { value: 'D', suit: 'B' },
    ]
  },
  'FF 1111 1111 1111': {
    check: function(hand) {
      if (lib.spliceMatching(hand, lib.isFlower).length !== 2) return false;
      if (Object.keys(lib.countsByValue(hand)).length !== 1) return false;
      return lib.matchesCountsBySuit(hand, { B: 4, K: 4, D: 4 });
    },
    hand: [
      { value: 'F' },
      { value: 'F' },

      { value: 1, suit: 'B' },
      { value: 1, suit: 'B' },
      { value: 1, suit: 'B' },
      { value: 1, suit: 'B' },

      { value: 1, suit: 'D' },
      { value: 1, suit: 'D' },
      { value: 1, suit: 'D' },
      { value: 1, suit: 'D' },

      { value: 1, suit: 'K' },
      { value: 1, suit: 'K' },
      { value: 1, suit: 'K' },
      { value: 1, suit: 'K' }
    ]
  },
  '22 44 66, 8888, 8888 (any 3 Suits)': {
    check: function(hand) {
      var bySuit = lib.binBySuit(hand);
      // 0 = 2-6, 1 = 8888, 2 = 8888
      var matches = [];
      var matchers = [
        { 2: 2, 4: 2, 6: 2 },
        { 8: 4 },
        { 8: 4 }
      ];
      for (var suit in bySuit) {
        var set = bySuit[suit];
        for (var i in matchers) {
          if (lib.matchesCountsByValue(set, matchers[i])) matches[i] = true;
        }
      }
      return matches[0] && matches[1] && matches[2];
    },
    hand: [
      { value: 2, suit: 'B' },
      { value: 2, suit: 'B' },
      { value: 4, suit: 'B' },
      { value: 4, suit: 'B' },
      { value: 6, suit: 'B' },
      { value: 6, suit: 'B' },

      { value: 8, suit: 'D' },
      { value: 8, suit: 'D' },
      { value: 8, suit: 'D' },
      { value: 8, suit: 'D' },

      { value: 8, suit: 'K' },
      { value: 8, suit: 'K' },
      { value: 8, suit: 'K' },
      { value: 8, suit: 'K' }
    ]
  },
  'N EE WWW SSSS 2013': {
    check: function(hand) {
      if (lib.spliceMatching(hand, lib.isSoap).length !== 1) return false;
      return lib.matchesCountsByValue({ N: 1, E: 2, W: 3, S: 4, 2: 1, 1: 1, 3: 1 });
    },
    hand: [
      { value: 'N' },

      { value: 'E' },
      { value: 'E' },

      { value: 'W' },
      { value: 'W' },
      { value: 'W' },

      { value: 'S' },
      { value: 'S' },
      { value: 'S' },
      { value: 'S' },

      { value: 2, suit: 'K' },
      { value: 'D', suit: 'D' },
      { value: 1, suit: 'K' },
      { value: 3, suit: 'K' }
    ]
  },
  'NN EE WW SS 11 22 33 (Any 3 Consec. Nos.)': {
    check: function(hand) {
      // extract winds
      var winds = lib.spliceMatching(hand, lib.isWind);
      // check for exact match on winds
      var windsMatch = { N: 2, E: 2, W: 2, S: 2 };
      if (!lib.matchesCountsByValue(winds, windsMatch)) return false;

      // sort remainder by value
      hand.sort(function(a, b) { return a.value - b.value; });
      // assert in order
      var N = hand[0].value;
      if (N > 7) return false;
      var numberMatch = {};
      numberMatch[N] = 2;
      numberMatch[N+1] = 2;
      numberMatch[N+2] = 2;
      return lib.matchesCountsByValue(hand, numberMatch);
    },
    hand: [
      { value: 'N' },
      { value: 'N' },

      { value: 'E' },
      { value: 'E' },

      { value: 'W' },
      { value: 'W' },

      { value: 'S' },
      { value: 'S' },

      { value: 4, suit: 'B' },
      { value: 4, suit: 'B' },

      { value: 5, suit: 'B' },
      { value: 5, suit: 'B' },

      { value: 6, suit: 'B' },
      { value: 6, suit: 'B' },
    ]
  },
  'FF DDDD NEWS DDDD (Any 2 Drangons)': {
    check: function(hand) {
      var flowers = lib.spliceMatching(hand, lib.isFlower);
      if (flowers.length !== 2) return false;
      var winds = lib.spliceMatching(hand, lib.isWind);
      if (!lib.matchesCountsByValue(winds, { N: 1, E: 1, W: 1, S: 1 })) return false;
      var bySuit = lib.binBySuit(hand);
      if (Object.keys(bySuit).length !== 2) return false;
      for (var suit in bySuit) {
        if (!lib.matchesCountsByValue(bySuit[suit], { D: 4 })) return false;
      }
      return true;
    },
    hand: [
      { value: 'F' },
      { value: 'F' },

      { value: 'D', suit: 'D' },
      { value: 'D', suit: 'D' },
      { value: 'D', suit: 'D' },
      { value: 'D', suit: 'D' },

      { value: 'N' },
      { value: 'E' },
      { value: 'W' },
      { value: 'S' },

      { value: 'D', suit: 'K' },
      { value: 'D', suit: 'K' },
      { value: 'D', suit: 'K' },
      { value: 'D', suit: 'K' }
    ]
  }
};


function doCheck(i, row) {
  console.log('\n=========================================');
  console.log('[', i, ']');
  for (var j in row.hands) {
    if (row.count) {
      row.check = function() {
        var counts = row.count([].concat(row.hands[j]));
        for (var suit in counts) {
          var bestCountsSet = _.values(counts)[0];
          bestCountsSet.forEach(function(bestCounts) {
            var matchedTiles = bestCounts.tiles;
            printRack(row.hands[j], matchedTiles);
          });
          if (counts[suit][0]._total === 14) return true;
        }
        return false;
      };
    }

    var failed = false;
    try {
      failed = !row.check(row.hands[j]);
    } catch(err) {
      failed = err;
    }
    if (failed) {
      console.log('"%s" doesn\'t match.', i);
      if (failed instanceof Error) throw failed;
    }
  }
}

for (var i in card) {
  if (card[i].hand) card[i].hands = [card[i].hand];
  doCheck(i, card[i]);
}

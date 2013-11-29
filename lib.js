
function isWind(tile) {
  return tile.value === 'N' || tile.value === 'S' || tile.value === 'E' ||
    tile.value === 'W';
}

function isFlower(tile) {
  return tile.value === 'F';
}

function spliceMatching(arr, matches, matchingItems) {
  if (!matchingItems) matchedItems = [];
  for (var i in arr) {
    if (matches(arr[i])) {
      var res = [arr[i]];
      arr.splice(i,1);
      return res.concat(spliceMatching(arr, matches, matchingItems));
    }
  }
  return [];
}

function binBySuit(hand) {
  var bySuit = {};
  hand.forEach(function(tile) {
    if (tile.suit) {
      if (!bySuit[tile.suit]) bySuit[tile.suit] = [];
      bySuit[tile.suit].push(tile);
    }
  });
  return bySuit;
}

function exactMatch(hand, expectedCounts) {
  var counts = {};
  var suit;
  for (var i in hand) {
    var tile = hand[i];
    if (tile.suit) {
      if (!suit) suit = tile.suit;
      if (suit !== tile.suit) return false;
    }
    // numbers
    if (!counts[tile.value]) counts[tile.value] = 0;
    counts[tile.value]++;
  }
  for (var i in expectedCounts) {
    if (counts[i] !== expectedCounts[i]) return false;
  }
  return true;
}

function matchesExpectedCounts(counts, expectedCounts) {
  for (var i in expectedCounts) {
    if (counts[i] !== expectedCounts[i]) return false;
  }
  return true;
}

function matchesCountsByValue(set, expectedCounts) {
  return matchesExpectedCounts(countsByValue(set), expectedCounts);
}

function countsByValue(hand) {
  var counts = {};
  for (var i in hand) {
    var tile = hand[i];
    // numbers
    if (!counts[tile.value]) counts[tile.value] = 0;
    counts[tile.value]++;
  }
  return counts;
}

function countsBySuit(hand) {
  var counts = {};
  for (var i in hand) {
    var suit = hand[i].suit || 'none';
    if (!counts[suit]) counts[suit] = 0;
    counts[suit]++;
  }
  return counts;

}

function valueCountsBySuit(hand) {
  var countsBySuit = {};
  for (var i in hand) {
    var tile = hand[i];
    var suit = tile.suit || null;
    if (!countsBySuit[suit]) countsBySuit[suit] = {};
    var counts = countsBySuit[suit];
    if (!counts[tile.value]) counts[tile.value] = 0;
    counts[tile.value]++;
  }
  return countsBySuit;
}

function exactMatchSuits(hand, expectedCounts) {
  var counts = {};
  var number;
  for (var i in hand) {
    var tile = hand[i];
    if (tile.suit) {
      if (!number) number = tile.value;
      if (number !== tile.value) return false;
      if (!counts[tile.suit]) counts[tile.suit] = 0;
      counts[tile.suit]++;
    } else {
      if (!counts[tile.value]) counts[tile.value] = 0;
      counts[tile.value]++;
    }
  }
  counts = counts
  for (var i in expectedCounts) {
    if (counts[i] !== expectedCounts[i]) return false;
  }
  return true;
}

var card = {
  '11 222 3333 4444 55 or 55 666 7777 888 99': {
    check: function(hand) {
      if (Object.keys(countsBySuit(hand)).length !== 1) return false;
      return matchesCountsByValue(hand, { 1: 2, 2: 3, 3: 4, 4: 3, 5: 2 }) ||
        matchesCountsByValue(hand, { 5: 2, 6: 3, 7: 4, 8: 3, 9: 2 });
    },
    count: function(hand) {
      console.log(countsBySuit(hand));
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
      if (Object.keys(countsBySuit(hand)).length !== 1) return false;
      return countsByValue(hand, { 1: 2, 3: 3, 5: 4, 7: 3, 9: 2 });
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
      if (Object.keys(countsBySuit(hand)).length !== 1) return false;
      return countsByValue(hand, { 2: 2, 4: 3, D: 4, 6: 3, 8: 2 });
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
      if (Object.keys(countsBySuit(hand)).length !== 2) return false;
      return countsByValue(hand, { F: 2, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, D: 2 });
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
      if (!Object.keys(countsByValue(hand)).length !== 1) return false;
      return exactMatchSuits(hand, { F: 2, B: 4, K: 4, D: 4 });
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
      var bySuit = binBySuit(hand);
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
          if (exactMatch(set, matchers[i])) matches[i] = true;
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
      var soap = false;
      for (var i in hand) {
        if (hand[i].value === 'D' && hand[i].suit === 'D') {
          soap = i;
          break;
        }
      }
      if (!soap) return false;
      hand.splice(i,1);
      return exactMatch({ N: 1, E: 2, W: 3, S: 4, 2: 1, 1: 1, 3: 1 });
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
      var winds = spliceMatching(hand, isWind);
      // check for exact match on winds
      var windsMatch = { N: 2, E: 2, W: 2, S: 2 };
      if (!exactMatch(winds, windsMatch)) return false;

      // sort remainder by value
      hand.sort(function(a, b) {
        return a.value - b.value;
      });
      // assert in order
      var N = hand[0].value;
      if (N > 7) return false;
      var numberMatch = {};
      numberMatch[N] = 2;
      numberMatch[N+1] = 2;
      numberMatch[N+2] = 2;
      return exactMatch(hand, numberMatch);
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
      var flowers = spliceMatching(hand, isFlower);
      if (flowers.length !== 2) return false;
      var winds = spliceMatching(hand, isWind);
      if (!exactMatch(winds, { N: 1, E: 1, W: 1, S: 1 })) return false;
      var bySuit = binBySuit(hand);
      if (Object.keys(bySuit).length !== 2) return false;
      for (var suit in bySuit) {
        if (!exactMatch(bySuit[suit], { D: 4 })) return false;
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


function doCheck(i, check, hand) {
  console.log('"%s" %s', i, check(hand)? 'matches!': 'doesn\'t match.');
}

for (var i in card) {
  if (card[i].hand) doCheck(i, card[i].check, card[i].hand);
  if (card[i].hands) {
    for (var j in card[i].hands) doCheck(i, card[i].check, card[i].hands[j]);
  }
}

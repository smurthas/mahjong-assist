require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"4JUkPH":[function(require,module,exports){
var lib = require('../lib');

var rack = require('../rack.js');

var SUITS = ['B', 'D', 'K'];
var SUIT_PERMS = ['BDK', 'BKD','DBK', 'DKB', 'KBD', 'KDB'];

module.exports.hands = [
  // 2013
  {
    title: 'N EE WWW SSSS 2013',
    permutations: 'N E E W W W S S S S 2X 0 1X 3X'
  },
  {
    title: 'FF 2013 1111 3333 (Any 3 Suits)',
    permutations: 'F F 2X 0 1X 3X 1Y 1Y 1Y 1Y 3Z 3Z 3Z 3Z'
  },
  {
    title: 'FFFF 2222 0000 13',
    permutations: 'F F F F 2X 2X 2X 2X 0 0 0 0 1X 3X'
  },

  // 2468
  {
    title: '22 444 DDDD 666 88',
    permutations: '2X 2X 4X 4X 4X DX DX DX DX 6X 6X 6X 8X 8X'
  },
  {
    title: '22 44 66, 8888, 8888 (any 3 Suits)',
    permutations: '2X 2X 4X 4X 6X 6X 8Y 8Y 8Y 8Y 8Z 8Z 8Z 8Z'
  },
  {
    title: 'FF 2222 44 66 8888 (Any 2 Suits)',
    permutations: 'F F 2X 2X 2X 2X 4Y 4Y 6Y 6Y 8X 8X 8X 8X'
  },
  {
    title: '222 4444 666 8888 (Any 2 Suits)',
    permutations: '2X 2X 2X 4X 4X 4X 4X 6Y 6Y 6Y 8Y 8Y 8Y 8Y'
  },
  {
    title: '22 444 44 666 8888 (Any 3 Suits, Kong 8s)',
    permutations: '2X 2X 4X 4X 4X 4Y 4Y 6Y 6Y 6Y 8Z 8Z 8Z 8Z'
  },
  {
    title: 'FF 222 444 666 888',
    permutations: 'F F 2X 2X 2X 4X 4X 4X 6X 6X 6X 8X 8X 8X'
  },

  // LIKE NUMBERS
  {
    title: 'FF 1111 1111 1111 (Any Like No.)',
    permutations: 'F F TX TX TX TX TY TY TY TY TZ TZ TZ TZ'
  },
  {
    title: '11 DD 111 DDD 1111 (Any Like No., Matching Dragon)',
    permutations: 'TX TX DX DX TY TY TY DY DY DY TZ TZ TZ TZ'
  },

  // SEVEN HANDS
  {
    title: 'FFFF 1111 + 66 = 7777 or (Any 3 Suits)',
    permutations: [
      'F F F F 1X 1X 1X 1X 6Y 6Y 7Z 7Z 7Z 7Z',
      'F F F F 1X 1X 1X 1X 6X 6X 7X 7X 7X 7X',
    ]
  },
  {
    title: 'FFFF 2222 + 55 = 7777 or (Any 3 Suits)',
    permutations: [
      'F F F F 2X 2X 2X 2X 5Y 5Y 7Z 7Z 7Z 7Z',
      'F F F F 2X 2X 2X 2X 5X 5X 7X 7X 7X 7X',
    ]
  },
  {
    title: 'FFFF 3333 + 44 = 7777 or (Any 3 Suits)',
    permutations: [
      'F F F F 3X 3X 3X 3X 4Y 4Y 7Z 7Z 7Z 7Z',
      'F F F F 3X 3X 3X 3X 4X 4X 7X 7X 7X 7X',
    ]
  },

  // QUINTS
  /*{
    title: '1223 22222 22222 (Any 3 Consec. Nos; Pr. Any No in Run; Pr. & Quints Match)',
    permutations: [
      'TX UX UX VX UY UY UY UY UY UZ UZ UZ UZ UZ',
      'TX UX VX VX VY VY VY VY VY VZ VZ VZ VZ VZ',
      'TX TX UX VX TY TY TY TY TY TZ TZ TZ TZ TZ'
    ]
  },
  {
    title: 'NNNNN DDDD 11111 (Quints Any Wind & Any No. in Any Suit; Kong Any Dragon)',
    permutations: [
      'N N N N N DX DX DX DX TX TX TX TX TX',
      'N N N N N DX DX DX DX TY TY TY TY TY',
      'E E E E E DX DX DX DX TX TX TX TX TX',
      'E E E E E DX DX DX DX TY TY TY TY TX',
      'S S S S S DX DX DX DX TX TX TX TX TX',
      'S S S S S DX DX DX DX TY TY TY TY TY',
      'W W W W W DX DX DX DX TX TX TX TX TX',
      'W W W W W DX DX DX DX TY TY TY TY TY'
    ]
  },
  {
    title: 'FFFF 11111 22222 (Any 2 Suits, Any 2 Consec. Nos.)',
    permutations: [
      'F F F F TX TX TX TX TX UY UY UY UY UY'
    ]
  },
  {
    title: '11111 2222 33333 (Any 3 Consec. Nos.; Kong Middle No. Only)',
    permutations: [
      'TX TX TX TX TX UX UX UX UX VX VX VX VX VX'
    ]
  },*/


  // CONSECUTIVE RUN
  {
    title: '11 222 3333 4444 55 or 55 666 7777 888 99',
    permutations: [
      '1X 1X 2X 2X 2X 3X 3X 3X 3X 4X 4X 4X 5X 5X',
      '5X 5X 6X 6X 6X 7X 7X 7X 7X 8X 8X 8X 9X 9X'
    ]
  },
  {
    title: '11 333 5555 777 99',
    permutations: '1X 1X 3X 3X 3X 5X 5X 5X 5X 7X 7X 7X 9X 9X'
  },
  {
    title: 'FF 11 22 33 44 55 DD',
    permutations: 'F F 1X 1X 2X 2X 3X 3X 4X 4X 5X 5X DX DX'
  },
  {
    title: 'NN EE WW SS 11 22 33 (Any 3 Consec. Nos.)',
    permutations: 'N N E E W W S S TX TX UX UX VX VX'
  },
  {
    title: 'FF DDDD NEWS DDDD (Any 2 Drangons)',
    permutations: 'F F DX DX DX DX N E W S DY DY DY DY'
  }
];

},{"../lib":3,"../rack.js":4}],"./cards/2013.js":[function(require,module,exports){
module.exports=require('4JUkPH');
},{}],3:[function(require,module,exports){
var parseRack = require('./rack.js').parseRack;
var SUIT_PERMS = ['BDK', 'BKD','DBK', 'DKB', 'KBD', 'KDB'];

exports.isWind = function isWind(tile) {
  return tile.value === 'N' || tile.value === 'S' || tile.value === 'E' ||
    tile.value === 'W';
}

exports.isFlower = function isFlower(tile) {
  return tile.value === 'F';
}

exports.isSoap = function(tile) {
  return tile.value === 'D' && tile.suit === 'D';
}

exports.spliceMatching = function spliceMatching(arr, matches, matchingItems) {
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

exports.binBySuit = function binBySuit(hand) {
  var bySuit = {};
  hand.forEach(function(tile) {
    if (tile.suit) {
      if (!bySuit[tile.suit]) bySuit[tile.suit] = [];
      bySuit[tile.suit].push(tile);
    }
  });
  return bySuit;
}

exports.binByValue = function binBySuit(hand) {
  var bins = {};
  hand.forEach(function(tile) {
    if (!bins[tile.value]) bins[tile.value] = [];
    bins[tile.value].push(tile);
  });
  return bins;
}

function matchesExpectedCounts (counts, expectedCounts) {
  for (var i in expectedCounts) {
    if (!counts[i] || counts[i].count !== expectedCounts[i]) return false;
  }
  return true;
}

exports.matchesCountsByValue = function(set, expectedCounts) {
  return matchesExpectedCounts(exports.countsByValue(set), expectedCounts);
}

exports.matchesCountsBySuit = function(set, expectedCounts) {
  return matchesExpectedCounts(exports.countsBySuit(set), expectedCounts);
}

exports.matchingCountOfCountsByValue  = function(set, expectedCounts) {
  var totalCounts = exports.countsByValue(set);
  var counts = {_total: 0, tiles: []};
  for (var i in expectedCounts) {
    if (typeof totalCounts[i] === 'object') {
      counts[i] = {
        count: Math.min(expectedCounts[i], totalCounts[i].count),
        tiles: totalCounts[i].tiles
      };
      counts.tiles = counts.tiles.concat(counts[i].tiles);
      counts._total += counts[i].count;
    }
  }
  return counts;
};

exports.matchingCountOfCountsBySuit = function(set, expectedCounts) {
  var totalCounts = exports.countsBySuit(set);
  var counts = {_total: 0, tiles: []};
  for (var i in expectedCounts) {
    if (typeof totalCounts[i] === 'object') {
      var count = Math.min(expectedCounts[i], totalCounts[i].count);
      counts[i] = {
        count: count,
        tiles: totalCounts[i].tiles.slice(0, count)
      };
      counts.tiles = counts.tiles.concat(counts[i].tiles);
      counts._total += counts[i].count;
    }
  }
  return counts;
};

exports.countsByValue = function(hand) {
  var counts = {};
  for (var i in hand) {
    var tile = hand[i];
    // numbers
    if (!counts[tile.value]) counts[tile.value] = {count: 0, tiles: []};
    counts[tile.value].count++;
    counts[tile.value].tiles.push(tile);
  }
  return counts;
}

exports.countsBySuit = function(hand) {
  var counts = {};
  for (var i in hand) {
    var suit = hand[i].suit || 'none';
    if (!counts[suit]) counts[suit] = {count: 0, tiles: []};
    counts[suit].count++;
    counts[suit].tiles.push(hand[i]);
  }
  return counts;
}

exports.valueCountsBySuit = function(hand) {
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

exports.exactMatchSuits = function(hand, expectedCounts) {
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

exports.generatePermutations = function(base) {
  var perms = [];
  var suitPermCount = 0;
  var numberCount = 0;
  ['X','Y','Z'].forEach(function(letter) {
    if (base.indexOf(letter) !== -1) suitPermCount++;
  });
  ['T','U','V'].forEach(function(letter) {
    if (base.indexOf(letter) !== -1) numberCount++;
  });

  var N;
  if (numberCount === 0) N = 2;
  else N = 11 - numberCount;

  if (suitPermCount === 0) {
    perms.push(parseRack(base));
  } else if (suitPermCount === 1) {
    for (var i = 1; i < N; i++) {
      for (var j in SUIT_PERMS[0]) {
        var p = base.replace(/T/g, i).replace(/U/g, i+1).replace(/V/g, i+2);
        p = p.replace(/X/g, SUIT_PERMS[0][j]);
        perms.push(parseRack(p));
      }
    }
  } else {
    for (var i = 1; i < N; i++) {
      for (var j in SUIT_PERMS) {
        var p = base.replace(/T/g, i).replace(/U/g, i+1).replace(/V/g, i+2);
        p = p.replace(/X/g, SUIT_PERMS[j][0]).replace(/Y/g, SUIT_PERMS[j][1])
             .replace(/Z/g, SUIT_PERMS[j][2]);
        perms.push(parseRack(p));
      }
    }
  }
  return perms;
}

exports.matchingTiles = function(_rack, hand) {
  // collect the results here
  var matchingTiles = [];

  // clone the array so we can remove matched elements
  var rack = [];
  for (var i in _rack) rack.push(_rack[i]);

  // for every tile in the hand
  for(var i in hand) {
    // for every tile in the rack (clone)
    for (var j in rack) {
      // if it's a match, add the tile to the matching set and remove it from
      // the rack so it doesn't get matched twice
      if (rack[j].suit === hand[i].suit && rack[j].value === hand[i].value) {
        matchingTiles.push(rack[j]);
        rack.splice(j, 1);
        break;
      }
    }
  }

  return matchingTiles;
}

exports.checkAndSortPermutations = function(rack, permutations) {
  var matchingSets = [];
  permutations.forEach(function(hand) {
    matchingSets.push({
      matched: exports.matchingTiles(rack, hand),
      permutation: hand
    });
  });
  matchingSets.sort(function(a, b) {
    return b.matched.length - a.matched.length;
  });
  return matchingSets;
}

exports.countsForRack = function(card, rack) {
  var handMatches = [];
  card.forEach(function(hand) {
    var matches = exports.checkAndSortPermutations(rack, hand.permutations);
    handMatches.push({
      matches: matches,
      hand: hand
    });
  });
  handMatches.sort(function(a, b) {
    if (!b.matches.length && !a.matches.length) return 0;
    if (!b.matches.length && a.matches.length) return 1;
    if (b.matches.length && !a.matches.length) return -1;
    return b.matches[0].matched.length - a.matches[0].matched.length;
  })
  return handMatches;
};

exports.printRack = function printRack(rack, matchingTiles) {
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

},{"./rack.js":4}],4:[function(require,module,exports){
module.exports.parseRack = function(rackString) {
  rackString = rackString.toUpperCase();
  var tiles = [];
  var tileChars = rackString.split(' ');
  for (var i in tileChars) {
    var tile = {};
    switch(tileChars[i]) {
      case 'F':
        tile.value = 'F';
        tile.suit = 'F';
        break;

      case 'N':
      case 'E':
      case 'W':
      case 'S':
        tile.value = tileChars[i];
        tile.suit = 'W';
        break;

      case 'GD':
      case 'DB':
        tile.value = 'D';
        tile.suit = 'B';
        break;
      case 'RD':
      case 'DK':
        tile.value = 'D';
        tile.suit = 'K';
        break;
      case 'BD':
      case 'DD':
      case '0':
        tile.value = 'D';
        tile.suit = 'D';
        break;

      default:
        tile.value = parseInt(tileChars[i][0]);
        tile.suit = tileChars[i][1];
        break;
    }
    tiles.push(tile);
  }
  return tiles;
}

},{}]},{},[])
;
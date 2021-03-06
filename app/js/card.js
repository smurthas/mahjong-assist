require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"5SoMHA":[function(require,module,exports){

var lib = require('./lib.js');

function Card(card) {
  card.forEach(function(hand) {
    if (typeof hand.permutations === 'string') {
      hand.permutations = lib.generatePermutations(hand.permutations);
    } else if (hand.permutations instanceof Array) {
      var perms = [];
      hand.permutations.forEach(function(permString) {
        perms = perms.concat(lib.generatePermutations(permString));
      });
      hand.permutations = perms;
    }
  });
  return card;
}

module.exports = Card;

},{"./lib.js":3}],"./card":[function(require,module,exports){
module.exports=require('5SoMHA');
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
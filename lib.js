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
  ['t','u','v','w'].forEach(function(letter) {
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
        var p = base.replace(/t/g, i).replace(/u/g, i+1).replace(/v/g, i+2)
          .replace(/w/g, i+3);
        p = p.replace(/X/g, SUIT_PERMS[0][j]);
        perms.push(parseRack(p));
      }
    }
  } else {
    for (var i = 1; i < N; i++) {
      for (var j in SUIT_PERMS) {
        var p = base.replace(/t/g, i).replace(/u/g, i+1).replace(/v/g, i+2)
          .replace(/w/g, i+3);
        p = p.replace(/X/g, SUIT_PERMS[j][0]).replace(/Y/g, SUIT_PERMS[j][1])
             .replace(/Z/g, SUIT_PERMS[j][2]);
        perms.push(parseRack(p));
      }
    }
  }
  return perms;
}

function countByExactTile(tiles) {
  var counts = {};
  tiles.forEach(function(tile) {
    var key = tile.value + tile.suit;
    if (!counts[key]) counts[key] = 0;
    counts[key]++;
  });
  return counts;
}

exports.getJokerEligibleCount = function(hand, matched) {
  var handCounts = countByExactTile(hand);
  var matchedCounts = countByExactTile(matched);
  var total = 0;
  for (var tile in handCounts) {
    // no singles or pairs
    if (handCounts[tile] > 2) {
      // add in the hand count
      total += handCounts[tile];
      // subtract out space we've already used up with real tiles
      if (matchedCounts[tile]) total -= matchedCounts[tile];
    }
  }
  return total;
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
      // dumb with jokers for now, TODO improve it
      if (rack[j].suit === hand[i].suit && rack[j].value === hand[i].value) {
        matchingTiles.push(rack[j]);
        rack.splice(j, 1);
        break;
      }
    }
  }

  var jokerEligibleCount = exports.getJokerEligibleCount(hand, matchingTiles);
  for (var i = 0; i < rack.length && jokerEligibleCount > 0; i++) {
    if (rack[i].suit === 'J') {
      matchingTiles.push(rack[i]);
      jokerEligibleCount--;
    }
  }

  return matchingTiles;
}

exports.checkAndSortPermutations = function(rack, permutations, remaining) {
  var matchingSets = [];
  permutations.forEach(function(hand) {
    var matching = exports.matchingTiles(rack, hand);
    var missing = [];
    for (var i in hand) {
      if (matching.indexOf(hand[i]) === -1) missing.push(hand[i]);
    }
    matchingSets.push({
      matched: matching,
      missing: missing,
      permutation: hand,
      P: exports.calcProbabilityOfPermutation(missing, remaining)
    });
  });
  matchingSets.sort(function(a, b) {
    return b.matched.length - a.matched.length;
  });
  return matchingSets;
}

exports.calcProbabilityOfPermutation = function(neededTiles, remainingTiles) {
  if (!remainingTiles || remainingTiles.length < neededTiles.length) return 0;
  var neededCounts = countByExactTile(neededTiles);
  var remaingCounts = countByExactTile(remainingTiles);
  var remainingTotal = remainingTiles.length;

  console.error('neededCounts', neededCounts);
  console.error('remaingCounts', remaingCounts);
  console.error('remainingTotal', remainingTotal);
  var p = 1;
  for (var i in neededCounts) {
    //if (!(neededCounts[i] < remaingCounts[i])) return 0;
    while (neededCounts[i] > 0) {
      p *= remaingCounts[i] / remainingTotal;
      console.error('p', p);
      remaingCounts[i]--;
      neededCounts[i]--;
      remainingTotal--;
    }
  }
  return p;
};

exports.countsForRack = function(card, rack, remaining) {
  var handMatches = [];
  card.forEach(function(hand) {
    var matches = exports.checkAndSortPermutations(rack, hand.permutations,
      remaining);
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

exports.matchingIndices = function(rack, matchingTiles) {
  var matchedIndices = [];
  if (matchingTiles) {
    matchingTiles.forEach(function(matchedTile) {
      for (var i = 0; i < rack.length; i++) {
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
  return matchedIndices;
}

function permutations(arr) {
  if (arr.length < 2) return arr;
  var arrs = [];
  for (var i = 0; i < arr.length; i++) {
    var sub = arr.slice(0, i).concat(arr.slice(i+1, arr.length));
    var perms = permutations(sub);
    for (var j in perms) arrs.push([arr[i]].concat(perms[j]));
  }
  return arrs;
}

exports.tilePerms = function(tiles, needed, maxIndex) {
  var perms = permutations(tiles);
  //console.log('got perms', perms.length);
  var mahjongCount = 0;
  for (var i in perms) {
    var inds = exports.matchingIndices(perms[i], needed).sort();
    if (inds[inds.length-1] < maxIndex) mahjongCount++;
  }
  return mahjongCount/perms.length;
}

exports.printRack = function printRack(rack, matchingTiles) {
  var topLine = '', bottomLine = '';

  var matchedIndices = exports.matchingIndices(rack, matchingTiles);

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

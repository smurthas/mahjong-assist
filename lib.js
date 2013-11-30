
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



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

function matchesExpectedCounts (counts, expectedCounts) {
  for (var i in expectedCounts) {
    if (counts[i] !== expectedCounts[i]) return false;
  }
  return true;
}

exports.matchesCountsByValue = function(set, expectedCounts) {
  return matchesExpectedCounts(exports.countsByValue(set), expectedCounts);
}

exports.matchesCountsBySuit = function(set, expectedCounts) {
  return matchesExpectedCounts(exports.countsBySuit(set), expectedCounts);
}

exports.countsByValue = function(hand) {
  var counts = {};
  for (var i in hand) {
    var tile = hand[i];
    // numbers
    if (!counts[tile.value]) counts[tile.value] = 0;
    counts[tile.value]++;
  }
  return counts;
}

exports.countsBySuit = function(hand) {
  var counts = {};
  for (var i in hand) {
    var suit = hand[i].suit || 'none';
    if (!counts[suit]) counts[suit] = 0;
    counts[suit]++;
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


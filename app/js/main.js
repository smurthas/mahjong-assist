;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var lib = require('./lib');
var parseRack = require('./rack').parseRack;
var Card = require('./card');
var _2013 = require('./cards/2013.js');
var ourCard = new Card(_2013.hands);

function generateRackHTML(rack, matched) {
  var html = '';
  var matchingIndices = [];
  if (matched) matchingIndices = lib.matchingIndices(rack, matched);
  for (var i in rack) {
    var tile = rack[i];
    var match = !matched || matchingIndices.indexOf(i) !== -1? '' : 'non-matched-tile ';
    html += '<div class="col-md-1 ' + match + 'col-rack">';
    if (tile.value !== 'D') {
      html += tile.value;
      if (tile.suit !== 'F' && tile.suit !== 'W' && tile.suit !== 'J') {
        html += tile.suit;
      }
    } else {
      if (tile.suit === 'D') html += '0';
      else if (tile.suit === 'K') html += 'RD';
      else if (tile.suit === 'B') html += 'GD';
    }
    html += '</div>';
  }
  return html;
}

function generateBestHandHTML(title, permutation, matched) {
  console.error('permutation', permutation);
  var html = '';
  var html = '<h3>' + title + '</h3>';
  html += '<div class="row" >';
  html += '<div class="col-md-11" >';
  html += generateRackHTML(permutation, matched);
  html += '</div>';
  html += '</div>';
  return html;
}
function updateBestHands(rack, number) {
  if (!number) number = 4;
  var counts = lib.countsForRack(ourCard, rack);
  console.log('counts', counts);
  $('#best-hands').html('');
  for (var i = 0; i < number; i++) {
    var match = counts[i];

    $('#best-hands').append(generateBestHandHTML(match.hand.title,
      match.matches[0].permutation, match.matches[0].matched));
  }
}
function updateRack(rack, selector) {
  if (!selector) selector = "#your-rack";
  var html = generateRackHTML(rack);
  $(selector).html(html);
}

var myRack = [];

function addTile(tile) {
  myRack.push(tile);
  updateRack(myRack);
  updateBestHands(myRack);
  updateRack(myRack, '#removeTileModal .row');
}

function removeTile(tile) {
  for (var i in myRack) {
    if (myRack[i].suit === tile.suit && myRack[i].value === tile.value) {
      myRack.splice(i, 1);
      break;
    }
  }
  updateRack(myRack);
  updateBestHands(myRack);
  updateRack(myRack, '#removeTileModal .row');
}

$(function() {
  /*myRack = parseRack('F F N N');
  updateRack(myRack);
  updateRack(myRack, '#removeTileModal .row');
  updateBestHands(myRack);*/
  //var rack = parseRack('F F N N E E 2K 0 1K 3K 1B 3D GD RD');
  //updateBestHands(rack, 8);

  $("#myModal").modal('show');
  $("#myModal .col-rack").click(function(e, a) {
    var tileText = $(e.target).text();
    var tile = parseRack(tileText)[0];
    addTile(tile);
    if (myRack && myRack.length === 14) $('#myModal').modal('hide');
  });

  $(document).on('click','#removeTileModal .col-rack', function(e) {
    var tileText = $(e.target).text();
    var tile = parseRack(tileText)[0];
    $('#removeTileModal').modal('hide')
    removeTile(tile);
  });
});

},{"./card":2,"./cards/2013.js":3,"./lib":4,"./rack":5}],2:[function(require,module,exports){

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

},{"./lib.js":4}],3:[function(require,module,exports){
var lib = require('../lib');

var rack = require('../rack.js');

var SUITS = ['B', 'D', 'K'];
var SUIT_PERMS = ['BDK', 'BKD','DBK', 'DKB', 'KBD', 'KDB'];

module.exports.hands = [
  // 2013
  {
    title: 'N EE WWW SSSS 2013',
    permutations: 'N E E W W W S S S S 2X 0 1X 3X',
    noJokers: 'N E E 2X 0 1X 3X'
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
    permutations: 'F F tX tX tX tX tY tY tY tY tZ tZ tZ tZ'
  },
  {
    title: '11 DD 111 DDD 1111 (Any Like No., Matching Dragon)',
    permutations: 'tX tX DX DX tY tY tY DY DY DY tZ tZ tZ tZ'
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
  {
    title: '1223 22222 22222 (Any 3 Consec. Nos; Pr. Any No in Run; Pr. & Quints Match)',
    permutations: [
      'tX uX uX vX uY uY uY uY uY uZ uZ uZ uZ uZ',
      'tX uX vX vX vY vY vY vY vY vZ vZ vZ vZ vZ',
      'tX tX uX vX tY tY tY tY tY tZ tZ tZ tZ tZ'
    ]
  },
  {
    title: 'NNNNN DDDD 11111 (Quints Any Wind & Any No. in Any Suit; Kong Any Dragon)',
    permutations: [
      'N N N N N DX DX DX DX tX tX tX tX tX',
      'N N N N N DX DX DX DX tY tY tY tY tY',
      'E E E E E DX DX DX DX tX tX tX tX tX',
      'E E E E E DX DX DX DX tY tY tY tY tX',
      'S S S S S DX DX DX DX tX tX tX tX tX',
      'S S S S S DX DX DX DX tY tY tY tY tY',
      'W W W W W DX DX DX DX tX tX tX tX tX',
      'W W W W W DX DX DX DX tY tY tY tY tY'
    ]
  },
  {
    title: 'FFFF 11111 22222 (Any 2 Suits, Any 2 Consec. Nos.)',
    permutations: [
      'F F F F tX tX tX tX tX uY uY uY uY uY'
    ]
  },
  {
    title: '11111 2222 33333 (Any 3 Consec. Nos.; Kong Middle No. Only)',
    permutations: [
      'tX tX tX tX tX uX uX uX uX vX vX vX vX vX'
    ]
  },


  // CONSECUTIVE RUN
  {
    title: '11 222 3333 444 55 or 55 666 7777 888 99',
    permutations: [
      '1X 1X 2X 2X 2X 3X 3X 3X 3X 4X 4X 4X 5X 5X',
      '5X 5X 6X 6X 6X 7X 7X 7X 7X 8X 8X 8X 9X 9X'
    ]
  },
  {
    title: '111 2222 333 4444 (Any 2 Suits,  Any 4 Consec. Nos.)',
    permutations: 'tX tX tX uX uX uX uX vY vY vY wY wY wY wY'
  },
  {
    title: 'FFFF 1111 2222 DD (Any 2 Consec. Nos.)',
    permutations: 'F F F F tX tX tX tX uX uX uX uX DX DX'
  },
  {
    title: '1111 22 22 22 3333 (Any 3 Consec. Nos. Like Pairs Middle No. Only)',
    permutations: 'tX tX tX tX uY uY uX uX uZ uZ vX vX vX vX'
  },
  {
    title: 'FF 1111 2222 3333 (Any 3 Suits, Any 3 Consec. Nos.)',
    permutations: 'F F tX tX tX tX uY uY uY uY vZ vZ vZ vZ'
  },
  {
    title: '111 222 333 444 DD (Any 3 Suits, Any 2 Consec. Nos; Pair Dr. 3rd Suit)',
    permutations: 'tX tX tX uX uX uX vY vY vY wY wY wY DZ DZ'
  },

  // 13579
  {
    title: '11 333 5555 777 99',
    permutations: '1X 1X 3X 3X 3X 5X 5X 5X 5X 7X 7X 7X 9X 9X'
  },
  {
    title: '111 3333 333 5555 or 555 7777 777 9999 (Any 2 Suits)',
    permutations: [
      '1X 1X 1X 3X 3X 3X 3X 3Y 3Y 3Y 5Y 5Y 5Y 5Y',
      '5X 5X 5X 7X 7X 7X 7X 7Y 7Y 7Y 9Y 9Y 9Y 9Y'
    ]
  },
  {
    title: 'FFFF 1111 33 5555  or FFFF 5555 77 9999',
    permutations: [
      'F F F F 1X 1X 1X 1X 3X 3X 5X 5X 5X 5X',
      'F F F F 5X 5X 5X 5X 7X 7X 9X 9X 9X 9X'
    ]
  },
  {
    title: '11 333 DDDD 333 55 or 55 777 DDDD 777 99',
    permutations: [
      '1X 1X 3X 3X 3X DY DY DY DY 3Z 3Z 3Z 5Z 5Z',
      '5X 5X 7X 7X 7X DY DY DY DY 7Z 7Z 7Z 9Z 9Z'
    ]
  },
  {
    title: '1111 33 55 77 9999 (Any 2 Suits)',
    permutations: '1X 1X 1X 1X 3Y 3Y 5Y 5Y 7Y 7Y 9X 9X 9X 9X'
  },
  {
    title: '11 33 11 33 55 1111 (Any 3 Suits, Kong 1, 3, or 5',
    permutations: [
      '1X 1X 3X 3X 1Y 1Y 3Y 3Y 5Y 5Y 1Z 1Z 1Z 1Z',
      '1X 1X 3X 3X 1Y 1Y 3Y 3Y 5Y 5Y 3Z 3Z 3Z 3Z',
      '1X 1X 3X 3X 1Y 1Y 3Y 3Y 5Y 5Y 5Z 5Z 5Z 5Z'
    ]
  },
  {
    title: '55 77 55 77 99 5555 (Any 3 Suits, Kong 5, 7, or 9)',
    permutations: [
      '5X 5X 7X 7X 5Y 5Y 7Y 7Y 9Y 9Y 5Z 5Z 5Z 5Z',
      '5X 5X 7X 7X 5Y 5Y 7Y 7Y 9Y 9Y 7Z 7Z 7Z 7Z',
      '5X 5X 7X 7X 5Y 5Y 7Y 7Y 9Y 9Y 9Z 9Z 9Z 9Z'
    ]
  },
  {
    title: '111 3 555 111 3 555 or 555 7 999 555 7 999 (Any 2 Suits)',
    permutations: [
      '1X 1X 1X 3X 5X 5X 5X 1Z 1Z 1Z 3Z 5Z 5Z 5Z',
      '5X 5X 5X 7X 9X 9X 9X 5Z 5Z 5Z 7Z 9Z 9Z 9Z'
    ]
  },

  // WINDS - DRAGONS
  {
    title: 'NNNN EEEE WWWW SS',
    permutations: 'N N N N E E E E W W W W S S'
  },
  {
    title: 'FF DDDD NEWS DDDD (Any 2 Drangons)',
    permutations: 'F F DX DX DX DX N E W S DY DY DY DY'
  },
  {
    title: 'NNNN SSSS 111 111',
    permutations: [
      'N N N N S S S S 1X 1X 1X 1X 1X 1X',
      'N N N N S S S S 3X 3X 3X 3X 3X 3X',
      'N N N N S S S S 5X 5X 5X 5X 5X 5X',
      'N N N N S S S S 7X 7X 7X 7X 7X 7X',
      'N N N N S S S S 9X 9X 9X 9X 9X 9X'
    ]
  },
  {
    title: 'EEEE WWWW 222 222',
    permutations: [
      'E E E E W W W W 2X 2X 2X 2X 2X 2X',
      'E E E E W W W W 4X 4X 4X 4X 4X 4X',
      'E E E E W W W W 6X 6X 6X 6X 6X 6X',
      'E E E E W W W W 8X 8X 8X 8X 8X 8X'
    ]
  },
  {
    title: 'FF NNNN EE WW SSSS',
    permutations: 'F F N N N N E E W W S S S S'
  },
  {
    title: 'FFFF DDDD DD DDDD',
    permutations: 'F F F F DX DX DX DX DY DY DZ DZ DZ DZ'
  },

  // 369
  {
    title: 'FF 333 66 999 DDDD',
    permutations: 'F F 3X 3X 3X 6X 6X 9X 9X 9X DX DX DX DX'
  },
  {
    title: '333 6666 666 9999 (Any 2 Suits)',
    permutations: '3X 3X 3X 6X 6X 6X 6X 6Y 6Y 6Y 9Y 9Y 9Y 9Y'
  },
  {
    title: '333 666 9999 9999 (Any 3 Suits)',
    permutations: '3X 3X 3X 6X 6X 6X 9Y 9Y 9Y 9Y 9Z 9Z 9Z 9Z'
  },
  {
    title: 'FF 3333 6666 9999 or FF 3333 6666 9999 (Any 3 Suits)',
    permutations: [
      'F F 3X 3X 3X 3X 6X 6X 6X 6X 9X 9X 9X 9X',
      'F F 3X 3X 3X 3X 6Y 6Y 6Y 6Y 9Z 9Z 9Z 9Z'
    ]
  },
  {
    title: '33 666 33 666 9999 (Any 3 Suits, Kong 9s)',
    permutations: [
      '3X 3X 6X 6X 6X 3Y 3Y 6Y 6Y 6Y 9Z 9Z 9Z 9Z'
    ]
  },
  {
    title: '33 66 33 66 99 3333 (Any 3 Suits, Kong 3, 6, or 9)',
    permutations: [
      '3X 3X 6X 6X 3Y 3Y 6Y 6Y 9Y 9Y 3Z 3Z 3Z 3Z',
      '3X 3X 6X 6X 3Y 3Y 6Y 6Y 9Y 9Y 6Z 6Z 6Z 6Z',
      '3X 3X 6X 6X 3Y 3Y 6Y 6Y 9Y 9Y 9Z 9Z 9Z 9Z'
    ]
  },


  // SINGLES AND PAIRS
  {
    title: 'NN EE WW SS 11 22 33 (Any 3 Consec. Nos.)',
    permutations: 'N N E E W W S S tX tX uX uX vX vX'
  },
  {
    title: 'FF 11 22 33 44 55 DD',
    permutations: 'F F 1X 1X 2X 2X 3X 3X 4X 4X 5X 5X DX DX'
  },
  {
    title: '11 33 55 77 99 11 11 (Any Like Odd No. in Other 2 Suits)',
    permutations: [
      '1X 1X 3X 3X 5X 5X 7X 7X 9X 9X 1Y 1Y 1Z 1Z',
      '1X 1X 3X 3X 5X 5X 7X 7X 9X 9X 3Y 3Y 3Z 3Z',
      '1X 1X 3X 3X 5X 5X 7X 7X 9X 9X 5Y 5Y 5Z 5Z',
      '1X 1X 3X 3X 5X 5X 7X 7X 9X 9X 7Y 7Y 7Z 7Z',
      '1X 1X 3X 3X 5X 5X 7X 7X 9X 9X 9Y 9Y 9Z 9Z',
    ]
  },
  {
    title: 'FF 22 44 66 88 22 22 (Any Like Even No. in Other 2 Suits)',
    permutations: [
      'F F 2X 2X 4X 4X 6X 6X 8X 8X 2Y 2Y 2Z 2Z',
      'F F 2X 2X 4X 4X 6X 6X 8X 8X 4Y 4Y 4Z 4Z',
      'F F 2X 2X 4X 4X 6X 6X 8X 8X 6Y 6Y 6Z 6Z',
      'F F 2X 2X 4X 4X 6X 6X 8X 8X 8Y 8Y 8Z 8Z',
    ]
  },
  {
    title: 'FF 11 22 11 22 11 22 (Any 2 Consec Nos in 3 Suits)',
    permutations: [
      'F F tX tX uX uX tY tY uY uY tZ tZ uZ uZ',
    ]
  },
  {
    title: '998 99887 998877 (Any 3 Suits, These Nos. Only)',
    permutations: [
      '9X 9X 8X 9Y 9Y 8Y 8Y 7Y 9Z 9Z 8Z 8Z 7Z 7Z',
    ]
  },
  {
    title: 'FF 2013 2013 2013 (3 Suits)',
    permutations: [
      'F F 2X 0 1X 3X 2Y 0 1Y 3Y 2Z 0 1Z 3Z',
    ]
  }

];

},{"../lib":4,"../rack.js":5}],4:[function(require,module,exports){
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

function getJokerEligibleCount(hand, matched) {
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

  var jokerEligibleCount = getJokerEligibleCount(hand, matchingTiles);
  for (var i = 0; i < rack.length && jokerEligibleCount > 0; i++) {
    if (rack[i].suit === 'J') {
      matchingTiles.push(rack[i]);
      jokerEligibleCount--;
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

exports.matchingIndices = function(rack, matchingTiles) {
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
  return matchedIndices;
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

},{"./rack.js":5}],5:[function(require,module,exports){
module.exports.parseRack = function(rackString) {
  rackString = rackString.toUpperCase();
  var tiles = [];
  var tileChars = rackString.split(' ');
  for (var i in tileChars) {
    var tile = {};
    switch(tileChars[i]) {
      case 'J':
      case 'JJ':
        tile.value = 'J';
        tile.suit = 'J';
        break;

      case 'F':
      case 'FF':
        tile.value = 'F';
        tile.suit = 'F';
        break;

      case 'N':
      case 'E':
      case 'W':
      case 'S':
      case 'NW':
      case 'EW':
      case 'WW':
      case 'SW':
        tile.value = tileChars[i].substring(0,1);
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

},{}]},{},[1])
;
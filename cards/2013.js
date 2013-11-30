var lib = require('../lib');

var rack = require('../rack.js');

module.exports.hands = [
  {
    title: '11 222 3333 4444 55 or 55 666 7777 888 99',
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
      rack.parseRack('1B 1B 2B 2B 2B 3B 3B 3B 3B 4B 4B 4B 5B 5B'),
      rack.parseRack('5B 5B 6B 6B 6B 7B 7B 7B 7B 8B 8B 8B 9B 9B')
    ]
  },
  {
    title: '11 333 5555 777 99',
    count: function(hand) {
      var bySuit = lib.binBySuit(hand);
      var counts = {};
      for (var suit in bySuit) {
        counts[suit] = [lib.matchingCountOfCountsByValue(bySuit[suit],
          { 1: 2, 3: 3, 5: 4, 7: 3, 9: 2})];
      }
      return counts;
    },
    hands: [
      rack.parseRack('1B 1B 3B 3B 3B 5B 5B 5B 5B 7B 7B 7B 9B 9B')
    ]
  },
  {
    title: '22 444 DDDD 6666 88',
    count: function(hand) {
      var bySuit = lib.binBySuit(hand);
      var counts = {};
      for (var suit in bySuit) {
        counts[suit] = [lib.matchingCountOfCountsByValue(bySuit[suit],
          { 2: 2, 4: 3, D: 4, 6: 3, 8: 2 })];
      }
      return counts;
    },
    hands: [
      rack.parseRack('2B 2B 4B 4B 4B GD GD GD GD 6B 6B 6B 8B 8B')
    ]
  },
  {
    title: 'FF 11 22 33 44 55 DD',
    count: function(hand) {
      var bins = lib.binBySuit(hand);
      for (var suit in bins) {
        for (var i in hand) {
          if (hand[i].suit === 'F') bins[suit].push(hand[i]);
        }
      }
      var counts = {};
      for (var suit in bins) {
        counts[suit] = [lib.matchingCountOfCountsByValue(bins[suit],
          { F: 2, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, D: 2 })];
      }
      return counts;
    },
    hands: [
      rack.parseRack('F F 1B 1B 2B 2B 3B 3B 4B 4B 5B 5B GD GD'),
      rack.parseRack('F F 1B 1B 2B 2B 3B 3B 4B 4B 5B 5B GD RD')
    ]
  },
  {
    title: 'FF 1111 1111 1111',
    check: function(hand) {
      if (lib.spliceMatching(hand, lib.isFlower).length !== 2) return false;
      if (Object.keys(lib.countsByValue(hand)).length !== 1) return false;
      return lib.matchesCountsBySuit(hand, { B: 4, K: 4, D: 4 });
    },
    count: function(rack) {
      var bins = lib.binByValue(rack);
      for (var value in bins) {
        if (value === 'F') continue;
        bins[value] = bins[value].concat(bins.F);
      }
      delete bins.F;

      var counts = {};
      for (var value in bins) {
        counts[value] = [lib.matchingCountOfCountsBySuit(bins[value],
            { F: 2, B: 4, K: 4, D: 4})];
      }
      return counts;
    },
    hands: [
      rack.parseRack('F F 1B 1B 1B 1B 1D 1D 1D 1D 1K 1K 1K 1K'),
      rack.parseRack('F F 1B 1B 1B 1B 1D 1D 1D 1D 1K 1K 1K 1D')
    ]
  },
  {
    title: '22 44 66, 8888, 8888 (any 3 Suits)',
    count: function(rack) {
      var bin = lib.binBySuit(rack);
      var combos = [['B','D','K'], ['B','K','D'],
                    ['D','B','K'], ['D','K','B'],
                    ['K','B','D'], ['K','D','B']];
      var matchers = [
        { 2: 2, 4: 2, 6: 2 },
        { 8: 4 },
        { 8: 4 }
      ];

      var counts = [];
      for (var i in combos) {
        var combo = combos[i];
        var comboCounts = [];
        for (var j in combo) {
          var suit = combo[j];
          var theseComboCounts =
            lib.matchingCountOfCountsByValue(bin[suit], matchers[j]);
          comboCounts.push(theseComboCounts);
        }
        counts[i] = comboCounts[0];
        counts[i]._total += comboCounts[1]._total;
        counts[i]._total += comboCounts[2]._total;
        counts[i].tiles = counts[i].tiles.concat(comboCounts[1].tiles)
            .concat(comboCounts[2].tiles);
      }
      counts.sort(function(a, b) {
        return b._total - a._total;
      });
      return counts;
    },
    hands: [
      rack.parseRack('2B 2B 4B 4B 6B 6B 8D 8D 8D 8D 8K 8K 8K 8K'),
      rack.parseRack('2B 2B 4B 4B 6B 6B 8D 8D 8D 8D 8K 8K 8K 7K'),
      rack.parseRack('2B 1B 4B 4B 6B 6B 8D 2D 8D 8D 8K 8K 8K 7K')
    ]
  },
  {
    title: 'N EE WWW SSSS 2013',
    check: function(hand) {
      if (lib.spliceMatching(hand, lib.isSoap).length !== 1) return false;
      return lib.matchesCountsByValue({ N: 1, E: 2, W: 3, S: 4, 2: 1, 1: 1, 3: 1 });
    },
    count: function(rack) {
      var soap = lib.spliceMatching(rack, lib.isSoap);
      var winds = lib.spliceMatching(rack, lib.isWind);
      winds = lib.matchingCountOfCountsByValue(winds, {N:1, E:2, W:3, S:4}).tiles;
      var bins = lib.binBySuit(rack);

      var counts = [];
      if (Object.keys(bins).length < 3) bins._ = {_totals:0, tiles:[]};
      for (var suit in bins) {
        var theseCounts = {_total:winds.length, tiles:winds};
        if (soap[0]) {
          theseCounts._total++;
          theseCounts.tiles.push(soap[0]);
        }
        theseCounts._total += bins[suit].length;
        theseCounts.tiles = theseCounts.tiles.concat(bins[suit]);
        counts.push(theseCounts);
      }
      return counts;
    },
    hands: [
      rack.parseRack('N E E W W W S S S S 2K 0 1K 3K')
    ]
  },
  {
    title: 'NN EE WW SS 11 22 33 (Any 3 Consec. Nos.)',
    check: function(hand) {
      // extract winds
      var winds = lib.spliceMatching(hand, lib.isWind);
      // check for exact match on winds
      var windsMatch = { N: 2, E: 2, W: 2, S: 2 };
      if (!lib.matchesCountsByValue(winds, windsMatch)) return false;

      if (Object.keys(lib.countsBySuit(hand)).length !== 1) return false;

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
    hands: [
      rack.parseRack('N N E E W W S S 4B 4B 5B 5B 6B 6B')
    ]
  },
  {
    title: 'FF DDDD NEWS DDDD (Any 2 Drangons)',
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
    hands: [
      rack.parseRack('F F 0 0 0 0 N E W S RD RD RD RD')
    ]
  }
];

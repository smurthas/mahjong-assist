var assert = require('assert');


var card = require('../cards/2013.js').hands;

var testRacks = require('./cards/2013.test.js');

var lib = require('../lib.js');
var parseRack = require('../rack.js').parseRack;


for (var i in testRacks) {
  describe(card[i].title, function() {
    var perms = card[i].permutations;
    if (typeof perms === 'string') perms = lib.generatePermutations(perms);

    testRacks[i].mahjong.forEach(function(rack) {
      describe(rack, function() {
        it('should match for mahjong', function() {
          rack = parseRack(rack);
          var matchedSets = lib.checkAndSortPermutations(rack, perms);
          assert.equal(matchedSets[0].matched.length, 14);
        });
      });
    });

    testRacks[i].counts.forEach(function(countsTestObject) {
      describe(countsTestObject.rack, function() {
        it('should match '+ countsTestObject.count + ' tiles', function() {
          var rack = parseRack(countsTestObject.rack);
          var matchedSets = lib.checkAndSortPermutations(rack, perms);
          assert.equal(matchedSets[0].matched.length, countsTestObject.count);
        });

      });
    });
  });
}

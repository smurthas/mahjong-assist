
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

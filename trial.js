var Card = require('./card.js');
var lib = require('./lib.js');

var ourCard = new Card(require('./cards/2013.js').hands);

var TileSet = require('./tileSet.js');

var RandoPlayer = require('./players/rando.js');
var GreedyPlayer = require('./players/greedy.js');
var LockInPlayer = require('./players/locke.js');


function runTrial(Player, print) {
  var tileSet = new TileSet();
  var player = new Player(tileSet.drawTiles(14), ourCard);

  var turns = 0;
  var discards = [];
  var ms = 0;
  do {
    var start = Date.now();
    discards.push(player.move());
    ms += (Date.now() - start);
    var done = !discards.slice(-1)[0];
    /*if (print) {
      console.log('\ndiscard:', discards.slice(-1));
      console.error('best hand');
      printBestHand(player.tiles);
    }*/
    if (done) {
      return {
        turns: turns,
        count: calcCount(player.tiles),
        moveTime: ms
      };
    }
    player.tiles.push(tileSet.drawTile());
    turns++;

  } while(tileSet.tiles.length > 0);
  console.log('no mahjong');
  return {
    turns: turns,
    count: calcCount(player.tiles),
    moveTime: ms
  }
}


function printBestHand(rack) {
  var counts = lib.countsForRack(ourCard, rack);
  var bestHand = counts[0];
  lib.printRack(bestHand.matches[0].permutation);
  lib.printRack(rack, bestHand.matches[0].matched);
}

function calcCount(rack) {
  var counts = lib.countsForRack(ourCard, rack);
  return counts[0].matches[0].matched.length;
}

var TRIALS = 100;
var turnsSum = 0;
var countSum = 0;
var moveTime = 0;
var start = Date.now();
for (var i = 0; i < TRIALS; i++) {
  //var res = runTrial(GreedyPlayer);
  var res = runTrial(LockInPlayer);
  //var res = runTrial(RandoPlayer);
  turnsSum += res.turns;
  countSum += res.count;
  moveTime += res.moveTime;
}

console.log('for %d trials, average turns was %d, average count was %d, ' +
    'average move time was %d ms, tooks %d ms',
    TRIALS, turnsSum/TRIALS, countSum/TRIALS, moveTime/turnsSum, Date.now() - start);

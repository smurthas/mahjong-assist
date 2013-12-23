var Card = require('./card.js');
var lib = require('./lib.js');

var ourCard = new Card(require('./cards/2013.js').hands);

var TileSet = require('./tileSet.js');

var RandoPlayer = require('./players/rando.js');
var GreedyPlayer = require('./players/greedy.js');
var LockInPlayer = require('./players/locke.js');
var SmartyPlayer = require('./players/smarty.js');

function Game(playersTypes) {
  var self = {
    play: function() {
      var tileSet = new TileSet();
      var turns = 0;
      var discards = [];
      var players = [];

      playersTypes.forEach(function(PlayerType) {
        players.push(new PlayerType(tileSet.drawTiles(13), ourCard));
      });

      var currentPlayerNumber = 0;
      do {
        var player = players[currentPlayerNumber];

        // draw a tile
        if (typeof player.take === 'function') player.take(tileSet.drawTile());
        else player.tiles.push(tileSet.drawTile());

        // discard a tile
        var discard = player.discard();

        // player claims mahjong
        if (!discard) {
          if (calcCount(player.tiles) !== 14) {
            console.error('player %d claimed mahjong, but didn\'t have it, ' +
                'disqualified!', currentPlayerNumber);
            players.splice(currentPlayerNumber, 1);
          } else {
            console.log('player %d got mahjong after %d turns!',
                currentPlayerNumber, turns);
            break;
          }
        }

        // notify the other players of the discard
        for (var i = 1; i < players.length; i++) {
          var nextPlayerNumber = (currentPlayerNumber + i) % players.length;
          var nextPlayer = players[nextPlayerNumber];
          if (typeof nextPlayer.onDiscard === 'function') {
            var call = nextPlayer.onDiscard(discard);
            if (call) {
              // can only call for mahjong right now, TODO all call types
              if (calcCount(nextPlayer.tiles.concat([discard])) === 14) {
                console.log('player %d called for mahjong after %d turns!',
                    nextPlayerNumber, turns);
                break;
              }
              throw new Error('not supported');
            }
          }
        }

        // put it on the table
        discards.push(discard);
        turns++;
        currentPlayerNumber = (currentPlayerNumber + 1) % players.length;
      } while(tileSet.tiles.length > 0);
      for (var i in players) {
        console.log('\nplayer %d ended with %d highest count', i,
            calcCount(players[i].tiles));
        printBestHand(players[i].tiles);
      }
      //console.log('game ended without anyone getting mahjong.');
      return false;
    }
  };

  return self;
}

function printBestHand(rack) {
  var counts = lib.countsForRack(ourCard, rack);
  var bestHand = counts[0];
  lib.printRack(bestHand.matches[0].permutation);
  lib.printRack(rack, bestHand.matches[0].matched);
}

function calcCount(rack) {
  var counts = lib.countsForRack(ourCard, rack);
  var count = counts[0].matches[0].matched.length;
  return count;
}

var game = new Game([LockInPlayer, SmartyPlayer, LockInPlayer, LockInPlayer]);

game.play();

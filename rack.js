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

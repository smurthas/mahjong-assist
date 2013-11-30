
module.exports.parseRack = function(rackString) {
  rackString = rackString.toUpperCase();
  var tiles = [];
  var tileChars = rackString.split(' ');
  for (var i in tileChars) {
    var tile = {};
    switch(tileChars[i]) {
      case 'F':
        tile.value = 'F';
        break;

      case 'N':
        tile.value = 'N';
        break;
      case 'E':
        tile.value = 'E';
        break;
      case 'W':
        tile.value = 'W';
        break;
      case 'S':
        tile.value = 'S';
        break;

      case 'GD':
        tile.value = 'D';
        tile.suit = 'B';
        break;
      case 'RD':
        tile.value = 'D';
        tile.suit = 'K';
        break;
      case 'BD':
      case '0':
        tile.value = 'D';
        tile.suit = 'D';
        break;

      default:
        tile.value = parseInt(tileChars[i][0]);
        tile.suit = tileChars[i][1];
        break;
    }
    console.error('tile', tile);
    tiles.push(tile);
  }
  return tiles;
}

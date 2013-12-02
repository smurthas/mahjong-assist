var lib = require('../lib');

var rack = require('../rack.js');

var SUITS = ['B', 'D', 'K'];
var SUIT_PERMS = ['BDK', 'BKD','DBK', 'DKB', 'KBD', 'KDB'];

module.exports.hands = [
  {
    title: '11 222 3333 4444 55 or 55 666 7777 888 99',
    hands: [
      rack.parseRack('1B 1B 2B 2B 2B 3B 3B 3B 3B 4B 4B 4B 5B 5B'),
      rack.parseRack('5B 5B 6B 6B 6B 7B 7B 7B 7B 8B 8B 8B 9B 9B')
    ],
    permutations: lib.generatePermutations(
        '1X 1X 2X 2X 2X 3X 3X 3X 3X 4X 4X 4X 5X 5X'
        ).concat(lib.generatePermutations(
        '5X 5X 6X 6X 6X 7X 7X 7X 7X 8X 8X 8X 9X 9X'))
  },
  {
    title: '11 333 5555 777 99',
    hands: [
      rack.parseRack('1B 1B 3B 3B 3B 5B 5B 5B 5B 7B 7B 7B 9B 9B')
    ],
    permutations: '1X 1X 3X 3X 3X 5X 5X 5X 5X 7X 7X 7X 9X 9X'
  },
  {
    title: '22 444 DDDD 666 88',
    hands: [
      rack.parseRack('2B 2B 4B 4B 4B GD GD GD GD 6B 6B 6B 8B 8B')
    ],
    permutations: '2X 2X 4X 4X 4X DX DX DX DX 6X 6X 6X 8X 8X'
  },
  {
    title: 'FF 11 22 33 44 55 DD',
    hands: [
      rack.parseRack('F F 1B 1B 2B 2B 3B 3B 4B 4B 5B 5B GD GD'),
      rack.parseRack('F F 1B 1B 2B 2B 3B 3B 4B 4B 5B 5B GD RD')
    ],
    permutations: 'F F 1X 1X 2X 2X 3X 3X 4X 4X 5X 5X DX DX'
  },
  {
    title: 'FF 1111 1111 1111',
    hands: [
      rack.parseRack('F F 1B 1B 1B 1B 1D 1D 1D 1D 1K 1K 1K 1K'),
      rack.parseRack('F F 2B 2B 1B 5B 1D 5D 5D 2D 1K 2K 2K 2K'),
      rack.parseRack('F F 1B 1B 1B 1B 1D 1D 1D 1D 1K 1K 1K 1D')
    ],
    permutations: 'F F TX TX TX TX TY TY TY TY TZ TZ TZ TZ'
  },
  {
    title: '22 44 66, 8888, 8888 (any 3 Suits)',
    hands: [
      rack.parseRack('2B 2B 4B 4B 6B 6B 8D 8D 8D 8D 8K 8K 8K 8K'),
      rack.parseRack('2B 2B 4B 4B 6B 6B 8D 8D 8D 8D 8K 8K 8K 7K'),
      rack.parseRack('2B 1B 4B 4B 6B 6B 8D 2D 8D 8D 8K 8K 8K 7K')
    ],
    permutations: '2X 2X 4X 4X 6X 6X 8Y 8Y 8Y 8Y 8Z 8Z 8Z 8Z'
  },
  {
    title: 'N EE WWW SSSS 2013',
    hands: [
      rack.parseRack('N E E W W W S S S S 2K 0 1K 3K')
    ],
    permutations: 'N E E W W W S S S S 2X 0 1X 3X'
  },
  {
    title: 'NN EE WW SS 11 22 33 (Any 3 Consec. Nos.)',
    hands: [
      rack.parseRack('N N E E W W S S 4B 4B 5B 5B 6B 6B')
    ],
    permutations: 'N N E E W W S S TX TX UX UX VX VX'
  },
  {
    title: 'FF DDDD NEWS DDDD (Any 2 Drangons)',
    hands: [
      rack.parseRack('F F 0 0 0 0 N E W S RD RD RD RD')
    ],
    permutations: 'F F DX DX DX DX N E W S DY DY DY DY'
  }
];

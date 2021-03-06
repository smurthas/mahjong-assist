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

var lib = require('../lib');

var rack = require('../rack.js');

var SUITS = ['B', 'D', 'K'];
var SUIT_PERMS = ['BDK', 'BKD','DBK', 'DKB', 'KBD', 'KDB'];

module.exports.hands = [
  // 2013
  {
    title: 'N EE WWW SSSS 2013',
    permutations: 'N E E W W W S S S S 2X 0 1X 3X'
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
    permutations: 'F F TX TX TX TX TY TY TY TY TZ TZ TZ TZ'
  },
  {
    title: '11 DD 111 DDD 1111 (Any Like No., Matching Dragon)',
    permutations: 'TX TX DX DX TY TY TY DY DY DY TZ TZ TZ TZ'
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
  /*{
    title: '1223 22222 22222 (Any 3 Consec. Nos; Pr. Any No in Run; Pr. & Quints Match)',
    permutations: [
      'TX UX UX VX UY UY UY UY UY UZ UZ UZ UZ UZ',
      'TX UX VX VX VY VY VY VY VY VZ VZ VZ VZ VZ',
      'TX TX UX VX TY TY TY TY TY TZ TZ TZ TZ TZ'
    ]
  },
  {
    title: 'NNNNN DDDD 11111 (Quints Any Wind & Any No. in Any Suit; Kong Any Dragon)',
    permutations: [
      'N N N N N DX DX DX DX TX TX TX TX TX',
      'N N N N N DX DX DX DX TY TY TY TY TY',
      'E E E E E DX DX DX DX TX TX TX TX TX',
      'E E E E E DX DX DX DX TY TY TY TY TX',
      'S S S S S DX DX DX DX TX TX TX TX TX',
      'S S S S S DX DX DX DX TY TY TY TY TY',
      'W W W W W DX DX DX DX TX TX TX TX TX',
      'W W W W W DX DX DX DX TY TY TY TY TY'
    ]
  },
  {
    title: 'FFFF 11111 22222 (Any 2 Suits, Any 2 Consec. Nos.)',
    permutations: [
      'F F F F TX TX TX TX TX UY UY UY UY UY'
    ]
  },
  {
    title: '11111 2222 33333 (Any 3 Consec. Nos.; Kong Middle No. Only)',
    permutations: [
      'TX TX TX TX TX UX UX UX UX VX VX VX VX VX'
    ]
  },*/


  // CONSECUTIVE RUN
  {
    title: '11 222 3333 4444 55 or 55 666 7777 888 99',
    permutations: [
      '1X 1X 2X 2X 2X 3X 3X 3X 3X 4X 4X 4X 5X 5X',
      '5X 5X 6X 6X 6X 7X 7X 7X 7X 8X 8X 8X 9X 9X'
    ]
  },
  {
    title: '11 333 5555 777 99',
    permutations: '1X 1X 3X 3X 3X 5X 5X 5X 5X 7X 7X 7X 9X 9X'
  },
  {
    title: 'FF 11 22 33 44 55 DD',
    permutations: 'F F 1X 1X 2X 2X 3X 3X 4X 4X 5X 5X DX DX'
  },
  {
    title: 'NN EE WW SS 11 22 33 (Any 3 Consec. Nos.)',
    permutations: 'N N E E W W S S TX TX UX UX VX VX'
  },
  {
    title: 'FF DDDD NEWS DDDD (Any 2 Drangons)',
    permutations: 'F F DX DX DX DX N E W S DY DY DY DY'
  }
];

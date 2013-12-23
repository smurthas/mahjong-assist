var assert = require('assert');

var lib = require('../lib');
var parseRack = require('../rack').parseRack;
var TileSet = require('../tileSet');

function nCr(n, r) {
  if (r < 1) return 1;
  var val = 1;
  for (var i = n; i > r && i > n-r; i--) val *= i;
  var min = Math.min(r, n-r);
  for (var i = min; i > 1; i--) val /= i;
  return val;
}

assert.equal(nCr(5,1), 5);
assert.equal(nCr(5,2), 10);
assert.equal(nCr(5,3), 10);
assert.equal(nCr(5,4), 5);
assert.equal(nCr(5,5), 1);

function P(tiles, needed, draw, redundant) {
  return nCr(tiles - needed, draw - needed)/nCr(tiles, draw);
}

function W(tiles, needed, draw, duplicates) {
  var p = nCr(tiles - needed, draw - needed);
  console.error('p', p);
  console.error('duplicates', duplicates);
  if(tiles <= draw || duplicates === 0) return p;
  return p + W(tiles-1, needed, draw, duplicates-1);
}

describe('lib', function() {
  describe('#tilePerms', function() {
    it('should return the probability of getting mahjong', function() {
      var tiles = parseRack('F 0 1B 1D');
      var needed = parseRack('F 1B');
      for (var i = needed.length; i <= tiles.length; i++) {
        assert.equal(lib.tilePerms(tiles, needed, i), P(tiles.length, needed.length, i), 'for ' + i);
      }
      assert.equal(lib.tilePerms(tiles, needed, 0), 0);
      assert.equal(lib.tilePerms(tiles, needed, 1), 0);
      assert.equal(lib.tilePerms(tiles, needed, 2), P(4,2,2));
      assert.equal(lib.tilePerms(tiles, needed, 3), P(4,2,3));
      assert.equal(lib.tilePerms(tiles, needed, 4), 1);
    });

    it('should return the probability of getting mahjong', function() {
      var tiles = parseRack('F 0 1B 1D');
      var needed = parseRack('F 1B 0');
      for (var i = needed.length; i <= tiles.length; i++) {
        assert.equal(lib.tilePerms(tiles, needed, i), P(tiles.length, needed.length, i), 'for ' + i);
      }
      assert.equal(lib.tilePerms(tiles, needed, 0), 0);
      assert.equal(lib.tilePerms(tiles, needed, 1), 0);
      assert.equal(lib.tilePerms(tiles, needed, 2), 0);
      assert.equal(lib.tilePerms(tiles, needed, 3), 1/nCr(4,3));
      assert.equal(lib.tilePerms(tiles, needed, 4), 1);
    });

    it('should return the probability of getting mahjong', function() {
      var tiles = parseRack('F 0 1B 1D RD');
      var needed = parseRack('F 1B 0');
      var R = nCr.bind(this, tiles.length);
      for (var i = needed.length; i <= tiles.length; i++) {
        assert.equal(lib.tilePerms(tiles, needed, i), P(tiles.length, needed.length, i), 'for ' + i);
      }
      assert.equal(lib.tilePerms(tiles, needed, 0), 0);
      assert.equal(lib.tilePerms(tiles, needed, 1), 0);
      assert.equal(lib.tilePerms(tiles, needed, 2), 0);
      assert.equal(lib.tilePerms(tiles, needed, 3), 1/R(3));
      assert.equal(lib.tilePerms(tiles, needed, 4), 2/R(4));
      assert.equal(lib.tilePerms(tiles, needed, 5), 1);
    });

    it('should return the probability of getting mahjong', function() {
      var tiles = parseRack('F 0 1B 1D RD GD');
      var needed = parseRack('F 1B 0');
      var R = nCr.bind(this, tiles.length);
      var K = nCr.bind(this, tiles.length - needed.length);
      for (var i = needed.length; i <= tiles.length; i++) {
        assert.equal(lib.tilePerms(tiles, needed, i), P(tiles.length, needed.length, i), 'for ' + i);
      }
      assert.equal(lib.tilePerms(tiles, needed, 0), 0);
      assert.equal(lib.tilePerms(tiles, needed, 1), 0);
      assert.equal(lib.tilePerms(tiles, needed, 2), 0);
      assert.equal(lib.tilePerms(tiles, needed, 3), K(3-needed.length)/R(3));
      assert.equal(lib.tilePerms(tiles, needed, 4), K(4-needed.length)/R(4));
      assert.equal(lib.tilePerms(tiles, needed, 5), K(5-needed.length)/R(5));
      assert.equal(lib.tilePerms(tiles, needed, 6), 1);
    });

    it('should return the probability of getting mahjong', function() {
      var tiles = parseRack('F 0 F GD RD');
      var needed = parseRack('F 0');
      var R = nCr.bind(this, tiles.length);
      var K = nCr.bind(this, tiles.length - needed.length);
      var duplicates = 1;
      var L = nCr.bind(this, tiles.length - needed.length - duplicates);
      assert.equal(lib.tilePerms(tiles, needed, 0), 0);
      assert.equal(lib.tilePerms(tiles, needed, 1), 0);
      assert.equal(lib.tilePerms(tiles, needed, 2), 2*K(2-needed.length)/R(2));
      for (var i = needed.length; i <= tiles.length; i++) {
        console.error('i', i);
        var num = W(tiles.length, needed.length, i, duplicates);
        var den = R(i);
        console.error('num', num);
        console.error('den', den);
        assert.equal(lib.tilePerms(tiles, needed, i), num/den);
      }
      //console.error('L(3)', L(3 - needed.length));
      //var num = (1+ duplicates)*L(3 - needed.length) + nCr(duplicates, needed.length)
      //assert.equal(lib.tilePerms(tiles, needed, 3),  /R(3));
      assert.equal(lib.tilePerms(tiles, needed, 3), (2*K(3-needed.length) - 1)/R(3));
      assert.equal(lib.tilePerms(tiles, needed, 4), (2*K(4-needed.length) - 2)/R(4));
    });

    it('should return the probability of getting mahjong', function() {
      var tiles = parseRack('F 0 F GD RD F');
      var needed = parseRack('F 0');
      var R = nCr.bind(this, tiles.length);
      var K = nCr.bind(this, tiles.length - needed.length);
      var duplicates = 2;
      for (var i = needed.length; i <= tiles.length; i++) {
        console.error('i', i);
        var num = W(tiles.length, needed.length, i, duplicates);
        var den = R(i);
        console.error('num', num);
        console.error('den', den);
        assert.equal(lib.tilePerms(tiles, needed, i), num/den);
      }
      assert.equal(lib.tilePerms(tiles, needed, 0), 0);
      assert.equal(lib.tilePerms(tiles, needed, 1), 0);
      assert.equal(lib.tilePerms(tiles, needed, 2), 3*K(2-needed.length)/R(2));
      assert.equal(lib.tilePerms(tiles, needed, 3), (3*K(3-needed.length) - 3)/R(3));
      assert.equal(lib.tilePerms(tiles, needed, 4), (3*K(4-needed.length) - (2+5+1))/R(4));
      assert.equal(lib.tilePerms(tiles, needed, 4), (3*K(4-needed.length) - (3+3+2))/R(4));
      //assert.equal(lib.tilePerms(tiles, needed, 5), (3*K(5-needed.length) - 4-3)/R(5));
      //assert.equal(lib.tilePerms(tiles, needed, 5), P(tiles.length, needed.length, 5, 2));
    });

    it('should be able to run on a whole tileset', function() {
      var tiles = new TileSet().drawTiles(6);

      var needed = parseRack('F F 1B 1B 2B 3B 4B 4B 5B');
      //lib.tilePerms(tiles, needed, 0);
    });
  });
});

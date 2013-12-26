var assert = require('assert');

var lib = require('../lib');
var parseRack = require('../rack').parseRack;
var TileSet = require('../tileSet');

function nCr(n, r) {
  if (r < 1) return 1;
  if (r > n) return 0;
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

function W(tiles, needed, draw, duplicates, duplicateNeeded) {
  var extra = draw - needed;
  var p = 0;
  var junk = tiles - needed - duplicates + duplicateNeeded;

  var iMax = duplicates? Math.min(extra, duplicates-1): extra;
  //console.error('junk: %d, iMax: %d, extra: %d', junk, iMax, extra);
  for (var i = 0; i <= iMax; i++) {
    var p1 = nCr(junk, extra - i);
    var p2 = nCr(duplicates, duplicateNeeded + i);
    p += p1 * p2;
  }
  return p;
}

describe('lib', function() {
  describe('#nCr', function() {
    it('should handle 0', function() {
      assert.equal(nCr(5, 0), 1);
    });
    it('should handle  2 C 3', function() {
      assert.equal(nCr(2, 3), 0);
    });
  });
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

      var duplicates = 0, duplicateNeeded = 0;
      for (var i = needed.length; i <= tiles.length; i++) {
        var num = W(tiles.length, needed.length, i, duplicates, duplicateNeeded);
        var den = R(i);
        //console.error('%d/%d', num, den);
        assert.equal(lib.tilePerms(tiles, needed, i), num/den);
      }
    });

    it('should return the probability of getting mahjong', function() {
      var tiles = parseRack('F 0 F GD RD');
      var needed = parseRack('F 0');
      var R = nCr.bind(this, tiles.length);
      var K = nCr.bind(this, tiles.length - needed.length);
      var duplicates = 2;
      var L = nCr.bind(this, tiles.length - needed.length - duplicates);
      assert.equal(lib.tilePerms(tiles, needed, 0), 0);
      assert.equal(lib.tilePerms(tiles, needed, 1), 0);
      assert.equal(lib.tilePerms(tiles, needed, 2), 2*K(2-needed.length)/R(2));

      for (var i = needed.length; i <= tiles.length; i++) {
        var num = W(tiles.length, needed.length, i, duplicates, 1);
        var den = R(i);
        assert.equal(lib.tilePerms(tiles, needed, i), num/den);
      }
    });

    it('should return the probability of getting mahjong', function() {
      var tiles = parseRack('F 0 F GD RD F');
      var needed = parseRack('F 0');
      var R = nCr.bind(this, tiles.length);
      var K = nCr.bind(this, tiles.length - needed.length);
      var duplicates = 3;
      for (var i = needed.length; i <= tiles.length; i++) {
        var num = W(tiles.length, needed.length, i, duplicates, 1);
        var den = R(i);
        assert.equal(lib.tilePerms(tiles, needed, i), num/den);
      }
    });

    it('should return the probability of getting mahjong', function() {
      var tiles = parseRack('F 0 F GD RD F');
      var needed = parseRack('F 0 F');
      var R = nCr.bind(this, tiles.length);
      var K = nCr.bind(this, tiles.length - needed.length);
      var duplicates = 3;
      for (var i = needed.length; i <= tiles.length; i++) {
        var num = W(tiles.length, needed.length, i, duplicates, 2);
        var den = R(i);
        assert.equal(lib.tilePerms(tiles, needed, i), num/den);
      }
      assert.equal(lib.tilePerms(tiles, needed, 0), 0);
      assert.equal(lib.tilePerms(tiles, needed, 1), 0);
      assert.equal(lib.tilePerms(tiles, needed, 2), 0);
    });

    it('should be able to run on a whole tileset', function() {
      var tiles = new TileSet().drawTiles(6);

      var needed = parseRack('F F 1B 1B 2B 3B 4B 4B 5B');
      //lib.tilePerms(tiles, needed, 0);
    });
  });
});

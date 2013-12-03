var lib = require('./lib');
var parseRack = require('./rack').parseRack;
var Card = require('./card');
var _2013 = require('./cards/2013.js');
var ourCard = new Card(_2013.hands);

function generateRackHTML(rack, matched) {
  var html = '';
  var matchingIndices = [];
  if (matched) matchingIndices = lib.matchingIndices(rack, matched);
  for (var i in rack) {
    var tile = rack[i];
    var match = !matched || matchingIndices.indexOf(i) !== -1? '' : 'non-matched-tile ';
    html += '<div class="col-md-1 ' + match + 'col-rack">';
    if (tile.value !== 'D') {
      html += tile.value;
      if (tile.suit !== 'F' && tile.suit !== 'W') html += tile.suit;
    } else {
      if (tile.suit === 'D') html += '0';
      else if (tile.suit === 'K') html += 'RD';
      else if (tile.suit === 'B') html += 'GD';
    }
    html += '</div>';
  }
  return html;
}

function generateBestHandHTML(title, permutation, matched) {
  console.error('permutation', permutation);
  var html = '';
  var html = '<h3>' + title + '</h3>';
  html += '<div class="row" >';
  html += '<div class="col-md-11" >';
  html += generateRackHTML(permutation, matched);
  html += '</div>';
  html += '</div>';
  return html;
}
function updateBestHands(rack, number) {
  if (!number) number = 3;
  var counts = lib.countsForRack(ourCard, rack);
  console.log('counts', counts);
  $('#best-hands').html('');
  for (var i = 0; i < number; i++) {
    var match = counts[i];

    $('#best-hands').append(generateBestHandHTML(match.hand.title,
      match.matches[0].permutation, match.matches[0].matched));
  }
}
function updateRack(rack, selector) {
  if (!selector) selector = "#your-rack";
  var html = generateRackHTML(rack);
  $(selector).html(html);
}

var myRack;

function addTile(tile) {
  myRack.push(tile);
  updateRack(myRack);
  updateBestHands(myRack);
  updateRack(myRack, '#removeTileModal .row');
}

function removeTile(tile) {
  for (var i in myRack) {
    if (myRack[i].suit === tile.suit && myRack[i].value === tile.value) {
      myRack.splice(i, 1);
      break;
    }
  }
  updateRack(myRack);
  updateBestHands(myRack);
  updateRack(myRack, '#removeTileModal .row');
}

$(function() {
  myRack = parseRack('F F N N');
  updateRack(myRack);
  updateRack(myRack, '#removeTileModal .row');
  updateBestHands(myRack);
  //var rack = parseRack('F F N N E E 2K 0 1K 3K 1B 3D GD RD');
  //updateBestHands(rack, 8);

  $("#myModal .col-rack").click(function(e, a) {
    var tileText = $(e.target).text();
    var tile = parseRack(tileText)[0];
    $('#myModal').modal('hide')
    addTile(tile);
  });

  $(document).on('click','#removeTileModal .col-rack', function(e) {
    var tileText = $(e.target).text();
    var tile = parseRack(tileText)[0];
    $('#removeTileModal').modal('hide')
    removeTile(tile);
  });
});

'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;

var CLOUD_TEXT_PADDING = CLOUD_X + GAP;

var HISOGRAMM_MAX_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var ME_COLOR = 'rgba(255,0,0,1)';


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};


var calculateTextRowXCoordinates = function (rowNumber) {
  return (CLOUD_Y + GAP + FONT_GAP) * rowNumber;
};

var printStatisticsMessage = function (ctx) {
  ctx.font = '16px "PT Mono"';
  ctx.fillStyle = '#000';

  ctx.fillText('Ура вы победили!', CLOUD_TEXT_PADDING, calculateTextRowXCoordinates(1));
  ctx.fillText('Список результатов:', CLOUD_TEXT_PADDING, calculateTextRowXCoordinates(2));
};

var renderStatisticsHistogram = function (ctx, players, times) {

  var maxTime = getMaxElement(times);

  ctx.fillStyle = '#000';
  for (var i = 0; i < players.length; i++) {
    ctx.fillText(
        players[i],
        CLOUD_X + ((COLUMN_GAP + COLUMN_WIDTH) * (i + 1)),
        CLOUD_Y + CLOUD_HEIGHT - FONT_GAP
    );
    if (players[i] === 'Вы') {
      ctx.fillStyle = ME_COLOR;
    } else {
      ctx.fillStyle = 'hsl(240,' + Math.random() * 100 + '%, 50%)';
    }
    ctx.fillRect(
        CLOUD_X + ((COLUMN_GAP + COLUMN_WIDTH) * (i + 1)),
        CLOUD_HEIGHT - FONT_GAP - GAP,
        COLUMN_WIDTH,
        // minus before is to make column grow from the bottom up
        -((HISOGRAMM_MAX_HEIGHT * times[i]) / maxTime)
    );
    ctx.fillStyle = '#000';
  }
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  printStatisticsMessage(ctx);
  renderStatisticsHistogram(ctx, players, times);
};

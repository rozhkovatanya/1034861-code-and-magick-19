'use strict';

(function () {

  var getRandomElement = function (array) {
    var randomNumber = Math.random() * array.length;
    var index = Math.floor(randomNumber);
    return array[index];
  };

  window.getRandomElement = getRandomElement;
})();

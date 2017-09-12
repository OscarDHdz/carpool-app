(function () {
  'use_strict';

  angular.module('app')
  .filter('weekDayString', function() {

  return function(input, param1) {

    var date = new Date(input + 'T00:00');


    return date.toString().split(' ')[0];

  }

});

})();

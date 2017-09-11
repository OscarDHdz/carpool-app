(function () {
  'use_strict';

  angular.module('app')
  .controller('mainController', [mainController]);

  function mainController() {
    var vm = this;

    init();

    function init() {
      console.log('mainController loaded');
    }


  }
})();

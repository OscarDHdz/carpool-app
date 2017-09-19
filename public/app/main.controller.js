(function () {
  'use_strict';

  angular.module('app')
  .controller('mainController', [mainController]);

  function mainController() {
    var vm = this;



    function init() {
      console.log('mainController loaded');
    }

    init();


  }
})();

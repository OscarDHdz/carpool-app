(function () {
  'use_strict';

  angular.module('app')
    .controller('toolbarController', [toolbarController]);

  function toolbarController() {
    var vm = this;

    init();

    function init() {
      console.log('toolbarController loaded');
    }


  }
})();

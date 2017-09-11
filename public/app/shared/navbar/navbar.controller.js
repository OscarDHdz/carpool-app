(function () {
  'use_strict';

  angular.module('app')
  .controller('navbarController', [navbarController]);

  function navbarController() {

    var vm = this;

    vm.message = 'Hello from controller';

    init();

    function init() {
      console.log('toolbarController loaded');
    }


  }
})();

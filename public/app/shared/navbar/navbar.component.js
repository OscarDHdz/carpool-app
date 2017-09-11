(function () {
  'use_strict';

  navbarController = function () {
    init();

    var vm = this;

    vm.message = 'Hello from controller';

    function init() {
      console.log('toolbarController loaded');
    }
  }

  angular.module('app')
  .component('appNavbar', {
    templateUrl: 'app/shared/navbar/navbar.html',
    controller: navbarController,
    controllerAs: 'vm'

  });




})();

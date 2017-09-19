(function () {
  'use_strict';

  var navbarController =['$location', function ($location) {


    var vm = this;

    vm.message = 'Hello from controller';

    function init() {
      console.log('toolbarController loaded');
    }

    vm.isActive = function (viewLocation) {
      console.log( 'HERE', viewLocation , $location.path());
      return viewLocation === $location.path();
    };

    init();
  }];

  angular.module('app')
  .component('appNavbar', {
    templateUrl: 'app/shared/navbar/navbar.html',
    controller: navbarController,
    controllerAs: 'vm'

  });




})();

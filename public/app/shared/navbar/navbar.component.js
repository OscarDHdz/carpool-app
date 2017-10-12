(function () {
  'use_strict';

  var navbarController =['$location', 'authService', function ($location, authService) {


    var vm = this;
    vm.auth = authService.data;

    vm.message = 'Hello from controller';

    function init() {
      console.log('toolbarController loaded');
    }

    vm.isActive = function (viewLocation) {
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

(function () {
  'use_strict';

  angular.module('app')
  .controller('mainController', ['$scope', 'authService', mainController]);

  function mainController($scope, authService) {
    var vm = this;
    vm.auth = authService.data;


    function init() {
      console.log('mainController loaded');

    }



    init();


  }
})();

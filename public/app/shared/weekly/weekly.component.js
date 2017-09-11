(function () {
  'use_strict';

  weeklyController = function () {
    init();

    var vm = this;

    vm.message = 'Hello from controller';

    function init() {
      console.log('weeklyController loaded');
    }
  }

  angular.module('app')
  .component('weeklyComponent', {
    templateUrl: 'app/shared/weekly/weekly.html',
    controller: weeklyController,
    controllerAs: 'vm'

  });




})();

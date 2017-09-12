(function () {
  'use_strict';

  var expensesController = function (tripsService) {

    var vm = this;
    vm.trips;

    function init( ) {

      console.log('expensesController loaded');

    }

    init();

  }

  angular.module('app')
  .component('expensesComponent', {
    templateUrl: 'app/shared/expenses/expenses.html',
    bindings: {
      expenses: '='
    },
    controller: expensesController,
    controllerAs: 'vm'


  });




})();

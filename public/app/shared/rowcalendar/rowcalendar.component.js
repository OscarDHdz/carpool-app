(function () {
  'use_strict';

  var rowcalendarController = ['tripsService', function (tripsService) {

    var vm = this;
    vm.trips;
    vm.hasTrips = false;

    function init( ) {

      console.log('rowcalendarController loaded');

    }

    init();

  }]

  angular.module('app')
  .component('rowcalendarComponent', {
    templateUrl: 'app/shared/rowcalendar/rowcalendar.html',
    bindings: {
      trips: '='
    },
    controller: rowcalendarController,
    controllerAs: 'vm'


  });




})();

(function () {
  'use_strict';

  var weeklyController = ['tripsService', function (tripsService) {

    var vm = this;
    vm.trips = tripsService.data.trips;
    vm.baseDate = new Date();
    vm.week = [ ];

    vm.message = 'Hello from component';

    function init() {
      console.log('weeklyController loaded');
      console.log(vm.trips);
      console.log(vm.baseDate);
      GetWeekDays(vm.baseDate);

      tripsService.getTrips()
      .then(function ( trips ) {
        console.log('HERE', trips);
        vm.trips = trips;
      })
      .catch(function ( err ) {
        console.error(err);
      })
    }

    function SetWeekRange( date ) {
      vm.baseDate = date;
    }

    function GetWeekDays( date ) {
      vm.week = [];
      var localDate = new Date(date);
      var baseDayOfWeek = date.getDay();
      localDate.setDate( localDate.getDate() - baseDayOfWeek );


      for (var i = 0; i < 7; i++) {
        // Date with: yyyy-mm-dd format
        var stringDate = localDate.getUTCFullYear() + '-' + ('0' + (localDate.getMonth() + 1)).slice(-2) + '-' + ('0' + localDate.getDate()).slice(-2);
        vm.week[i] = {
          title: localDate.toString().split(' ')[0],
          date: stringDate,
          dateObj: new Date(localDate)
        }
        // Next day
        localDate.setDate( localDate.getDate() + 1 );
      }

      console.log('week', vm.week);



    }

    init();

  }]

  angular.module('app')
  .component('weeklyComponent', {
    templateUrl: 'app/shared/weekly/weekly.html',
    controller: weeklyController,
    controllerAs: 'vm'

  });




})();

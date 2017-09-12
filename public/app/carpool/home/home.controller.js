(function () {
  'use_strict';

  angular.module('app.carpool')
    .controller('homeController', ['tripsService', homeController]);

  function homeController( tripsService ) {
    var vm = this;
    vm.trips = {};
    vm.thisWeekTrips = {}
    vm.lastWeekTrips = {}
    vm.tripsReady = false;




    function init() {
      console.log('homeController loaded');

      tripsService.getTrips()
      .then(function ( trips ) {
        vm.trips = trips;
        // Set This Week Trips
        var currentDate = new Date();
        var currentWeekWeekDays = GetWeekDays(currentDate);
        vm.thisWeekTrips = WeekTrips(currentWeekWeekDays);
        // Last week Trips
        currentDate.setDate(currentDate.getDate()-7);
        var lastWeekDate = currentDate;
        var lastWeekWeekDays = GetWeekDays(lastWeekDate)
        vm.lastWeekTrips = WeekTrips(lastWeekWeekDays);

        vm.tripsReady = true;
      })
      .catch(function ( err ) {
        console.error(err);
      })

    }

    function GetWeekDays( date ) {
      var weekdays = [];
      var localDate = new Date(date);
      var baseDayOfWeek = date.getDay();
      // Set Weekday to Monday
      localDate.setDate( localDate.getDate() - baseDayOfWeek + 1 );


      for (var i = 0; i < 5; i++) {
        // Date with: yyyy-mm-dd format
        var stringDate = localDate.getUTCFullYear() + '-' + ('0' + (localDate.getMonth() + 1)).slice(-2) + '-' + ('0' + localDate.getDate()).slice(-2);
        weekdays.push(stringDate)
        // Next day
        localDate.setDate( localDate.getDate() + 1 );
      }

      return weekdays;



    }
    function WeekTrips( weekdays ) {
      var trips = {};
      weekdays = weekdays.sort();
      for (var i = 0; i < weekdays.length; i++) {
        trips[weekdays[i]] = vm.trips[weekdays[i]];
      }
      return trips;
    }

    init();



  }
})();

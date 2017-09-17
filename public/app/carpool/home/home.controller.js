(function () {
  'use_strict';

  angular.module('app.carpool')
    .controller('homeController', ['usersService', 'tripsService', homeController]);

  function homeController( usersService, tripsService ) {
    var vm = this;
    vm.trips = {};
    vm.expenses = [];
    vm.users = []
    vm.thisWeekTrips = {}
    vm.thisWeekExpenses = {}
    vm.thisWeekHasTrips = false;
    vm.lastWeekTrips = {}
    vm.lastWeekExpenses = {}
    vm.lastWeekHasTrips = false;
    vm.tripsReady = false;




    function init() {
      console.log('homeController loaded');

      usersService.getUsers()
      .then(function ( users ) {
        vm.users = users;
        return tripsService.getTripsData();
      })
      .then(function ( trips ) {
        vm.trips = trips;
        console.log(vm.trips);

        // Set This Week Trips
        var currentDate = new Date();
        var currentWeekWeekDays = GetWeekDays(currentDate);
        vm.thisWeekTrips = WeekTrips(currentWeekWeekDays, vm.trips);
        for (var day in vm.thisWeekTrips) {
          if ( vm.thisWeekTrips[day].length > 0 ) {
            vm.thisWeekHasTrips = true;
            break;
          }
        }
        vm.thisWeekExpenses = GetUserExpenses(vm.thisWeekTrips, vm.users);

        // Last week Trips
        currentDate.setDate(currentDate.getDate()-7);
        var lastWeekDate = currentDate;
        var lastWeekWeekDays = GetWeekDays(lastWeekDate)
        vm.lastWeekTrips = WeekTrips(lastWeekWeekDays, vm.trips);
        for (var day in vm.lastWeekTrips) {
          if ( vm.lastWeekTrips[day].length > 0 ) {
            vm.lastWeekHasTrips = true;
            break;
          }
        }
        vm.lastWeekExpenses = GetUserExpenses(vm.lastWeekTrips, vm.users);

        // Format

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

    function WeekTrips( weekdays, trips ) {
      var weekTrips = {};
      weekdays = weekdays.sort();
      for (var i = 0; i < weekdays.length; i++) {
        weekTrips[weekdays[i]] = [];
        weekTrips[weekdays[i]] = trips.filter(function (trip) {
          if (trip.date.toString().split('T')[0] === weekdays[i] ) return true;
          return false;
        })

      }
      return weekTrips;
    }

    function GetUserExpenses( days, users ) {

      var expensesByUsers = {};
      for (var i = 0; i < users.length; i++) {
        expensesByUsers[users[i].email] = {
          firstname: users[i].firstname,
          lastname: users[i].lastname,
          owes: 0,
          color: users[i].color
        }
      }

      for (var day in days) {

        var dayTrips = days[day];


        for (var i = 0; i < dayTrips.length; i++) {
          var trip = dayTrips[i];
          var tripCost = (trip.cost / trip.users_obj.length);
          for (var j = 0; j < trip.users_obj.length; j++) {
            var user = trip.users_obj[j];
            expensesByUsers[user.email].owes += tripCost;
          }
        }

        // Round final account
        for (var user in expensesByUsers) {
          expensesByUsers[user].owes = Math.round(expensesByUsers[user].owes);
        }


      }


      return expensesByUsers;

    }

    init();



  }
})();

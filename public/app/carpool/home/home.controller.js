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
    vm.lastWeekTrips = {}
    vm.lastWeekExpenses = {}
    vm.tripsReady = false;




    function init() {
      console.log('homeController loaded');

      usersService.getUsers()
      .then(function ( data ) {
        vm.users = data;
        return tripsService.getTripsData();
      })
      .then(function ( data ) {
        vm.trips = data.trips;
        // vm.users = data.users;
        // Set This Week Trips
        var currentDate = new Date();
        var currentWeekWeekDays = GetWeekDays(currentDate);
        vm.thisWeekTrips = WeekTrips(currentWeekWeekDays);
        vm.thisWeekExpenses = GetUserExpenses(vm.thisWeekTrips, vm.users);
        // Last week Trips
        currentDate.setDate(currentDate.getDate()-7);
        var lastWeekDate = currentDate;
        var lastWeekWeekDays = GetWeekDays(lastWeekDate)
        vm.lastWeekTrips = WeekTrips(lastWeekWeekDays);
        vm.lastWeekExpenses = GetUserExpenses(vm.lastWeekExpenses, vm.users);
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
    function WeekTrips( weekdays ) {
      var trips = {};
      weekdays = weekdays.sort();
      for (var i = 0; i < weekdays.length; i++) {
        trips[weekdays[i]] = vm.trips[weekdays[i]];
      }
      return trips;
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
        var dayData = days[day];
        for (var trip in dayData) {
          var tripData = dayData[trip];

          var tripCost = tripData.cost;
          var splittedCost = Math.round( tripCost / tripData.travelers.length );
          for (var i = 0; i < tripData.travelers.length; i++) {
            expensesByUsers[tripData.travelers[i].user.email].owes += splittedCost;
          }
        }
      }

      return expensesByUsers;

    }

    init();



  }
})();

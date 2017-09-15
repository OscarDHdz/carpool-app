(function () {
  'use_strict';

  angular.module('app.carpool')
    .controller('tripModalController', ['usersService', 'tripsService', '$uibModalInstance', 'trip', tripModalController]);

  function tripModalController( usersService, tripsService, $uibModalInstance, trip ) {
    var vm = this;

    vm.trip;
    vm.availableUsers = [];
    vm.newItem = true;

    vm.datepicker = {
      opened: false
    };
    vm.format = 'yyyy-MM-dd';

    vm.dateOptions = {
       dateDisabled: false,
       formatYear: 'yy',
       maxDate: new Date(2020, 5, 22),
       minDate: new Date(2017, 6, 1),
       startingDay: 1
     };

    vm.openDatePicker = function () {
     vm.datepicker.opened = true;
    }

    function init() {
      console.log('tripModalController loaded');
      if ( trip ) { vm.trip = new Trip(trip); vm.newItem = false;  }
      else vm.trip = new Trip();

      usersService.getUsers()
      .then(function ( users ) {
        for (var i = 0; i < users.length; i++) {
            vm.availableUsers.push(users[i]);
        }
      })
      .catch(function ( err ) {
        console.error(err);
      })


    }

    vm.SubmitTrip = function ( tripModel ) {

      if ( vm.newItem ) {
        tripsService.CreateTrip( tripModel )
        .then(function ( tripId ) {
          console.log('Created User');
          var submittedTrip = new Trip(tripModel);
          submittedTrip.id = tripId;
          $uibModalInstance.close(submittedTrip);
        })
        .catch(function ( err ) {
          console.error(err);
        })
      }
      else {
        usersService.SaveUser( userModel )
        .then(function ( data ) {
          console.log('Saved User');
          User.Copy(user, userModel);
          $uibModalInstance.dismiss();
        })
        .catch(function ( err ) {
          console.error(err);
        })
      }


    }

    vm.CloseModal = function () {
      $uibModalInstance.dismiss();
    }

    vm.UserSelect = function ( user, selected, index ) {


      if ( selected ) {
        vm.trip.users_obj.push(user);
        vm.trip.users.push(user.id)

        //Remove from previous
        vm.availableUsers.splice(index, 1)
      }
      else {
        vm.availableUsers.push(user);

        vm.trip.users_obj.splice(index, 1);
        vm.trip.users.splice( vm.trip.users.indexOf(user.id), 1 )
      }



    }

    init();



  }
})();

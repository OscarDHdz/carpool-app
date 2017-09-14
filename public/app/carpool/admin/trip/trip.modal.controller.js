(function () {
  'use_strict';

  angular.module('app.carpool')
    .controller('tripModalController', ['usersService', '$uibModalInstance', 'trip', tripModalController]);

  function tripModalController( usersService, $uibModalInstance, trip ) {
    var vm = this;

    vm.trip;
    vm.newItem = true;

    function init() {
      console.log('tripModalController loaded');
      if ( trip ) { vm.trip = new Trip(trip); vm.newItem = false;  }
      else vm.trip = new Trip();
    }

    vm.SubmitUser = function ( userModel ) {

      if ( vm.newItem ) {
        usersService.CreateUser( userModel )
        .then(function ( data ) {
          console.log('Created User');
          var submittedUser = new User(userModel);
          $uibModalInstance.close(submittedUser);
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

    init();



  }
})();

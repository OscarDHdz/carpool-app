(function () {
  'use_strict';

  angular.module('app.carpool')
    .controller('userModalController', ['usersService', '$uibModalInstance', 'user', userModalController]);

  function userModalController( usersService, $uibModalInstance, user ) {
    var vm = this;

    vm.user;
    vm.newItem = true;

    function init() {
      console.log('userModalController loaded');
      if ( user ) { vm.user = new User(user); vm.newItem = false;  }
      else vm.user = new User();
    }

    vm.SubmitUser = function ( userModel ) {

      if ( vm.newItem ) {
        usersService.CreateUser( userModel )
        .then(function ( userId ) {
          console.log('Created User');
          var submittedUser = new User(userModel);
          submittedUser.id = userId;
          console.log('HERE', submittedUser);
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

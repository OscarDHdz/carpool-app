(function () {
  'use_strict';

  angular.module('app.carpool')
    .controller('adminController', ['usersService', 'tripsService', adminController]);

  function adminController( usersService, tripsService ) {
    var vm = this;
    vm.users = [];
    vm.newUser = {
      firstname: null,
      lastname: null,
      email: null,
      color: null,
      username: null
    }



    function init() {
      console.log('adminController loaded');

      usersService.getUsers()
      .then(function (data) {
        vm.users = data;
      })
      .catch(function (err) {
        console.error(err);
      })
    }

    vm.SubmitUser = function ( user ) {
      usersService.CreateUser( user )
      .then(function ( data ) {
        console.log('Submitted User');
        var submittedUser = new User(user);
        console.log(submittedUser);
        vm.users.push(submittedUser)
        CleanNewUser();

      })
      .catch(function ( err ) {
        console.error(err);
      })
    }

    function CleanNewUser() {
      vm.newUser = {
        firstname: null,
        lastname: null,
        email: null,
        color: null,
        username: null
      }
    }

    init();



  }
})();

(function () {
  'use_strict';

  angular.module('app.carpool')
    .controller('adminController', ['usersService', 'tripsService', '$uibModal', adminController]);

  function adminController( usersService, tripsService, $uibModal ) {
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

    vm.OpenUserModal = function () {
      // var parentElem = 'body'
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/carpool/admin/user/user.modal.html',
        controller: 'userModalController',
        controllerAs: 'vm',
        size: 'sm',
        // appendTo: parentElem,
        resolve: {
          items: function () {
            return [];
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $ctrl.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
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

(function () {
  'use_strict';

  angular.module('app.carpool')
    .controller('adminController', ['usersService', 'tripsService', '$uibModal', '$log', adminController]);

  function adminController( usersService, tripsService, $uibModal, $log ) {
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

    vm.OpenUserModal = function ( user ) {
      // var parentElem = 'body'
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/carpool/admin/user/user.modal.html',
        controller: 'userModalController',
        controllerAs: 'vm',
        size: 'lg',
        // bindings: {
        //   resolve: '<',
        //   close: '&',
        //   dismiss: '&'
        // },
        // appendTo: parentElem,
        resolve: {
          user: function () {
            return user;
          }
        }
      });

      modalInstance.result.then(function (user) {
        console.log('Submitted user:', user);
        vm.users.push(user);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });


    }



    init();



  }
})();

(function () {
  'use_strict';

  angular.module('app.carpool')
    .controller('adminController', ['usersService', 'tripsService', '$uibModal', '$log',  adminController]);

  function adminController( usersService, tripsService, $uibModal, $log) {
    var vm = this;
    vm.users = [];
    vm.trips = [];
    vm.newUser = {
      firstname: null,
      lastname: null,
      email: null,
      color: null,
      username: null
    }
    vm.adminReady = false;
    vm.activeTab = 0;



    function init() {
      console.log('adminController loaded');

      usersService.getUsers()
      .then(function (users) {
        vm.users = users;
        return tripsService.getTripsData();
      })
      .then(function (trips) {
        vm.trips = trips;
        vm.adminReady = true;
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

    vm.OpenTripModal = function ( trip ) {
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/carpool/admin/trip/trip.modal.html',
        controller: 'tripModalController',
        controllerAs: 'vm',
        size: 'lg',
        resolve: {
          trip: function () {
            return trip;
          }
        }
      });

      modalInstance.result.then(function (trip) {
        console.log('Submitted trip:', trip);
        vm.trips.push(trip);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    }

    vm.RemoveTrip = function ( trip ) {
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/carpool/admin/confirm/confirm.modal.html',
        controller: 'confirmModalController',
        controllerAs: 'vm',
        size: 'lg',
        resolve: {
          trip: function () {
            return trip;
          }
        }
      });

      modalInstance.result.then(function (response) {
        console.log('Remove trip?:', response);
        if ( response === true ) {

          tripsService.DeleteTrip( trip )
          .then(function ( response ) {
            for (var i = 0; i < vm.trips.length; i++) {
              if ( vm.trips[i].id === trip.id ) vm.trips.splice(i, 1);
            }
            console.log('Removed Trip');

          })
          .catch(function ( err ) {
            console.error(err);
          })


        }
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    }

    init();



  }
})();

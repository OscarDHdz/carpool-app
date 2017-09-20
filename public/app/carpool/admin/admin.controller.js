(function () {
  'use_strict';

  angular.module('app.carpool')
    .controller('adminController', ['authService', '$location', 'usersService', 'tripsService', '$uibModal', '$log', 'toaster', adminController]);

  function adminController(authService, $location, usersService, tripsService, $uibModal, $log, toaster) {
    var vm = this;
    vm.users = [];
    vm.trips = [];
    vm.tripsPagination = {
      items: vm.trips,
      pageItems: 10,
      currentPage: 1
    }
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

      if ( authService.data.granted !== true ) {
        return $location.path('/login')
      }


      usersService.getUsers()
      .then(function (users) {
        vm.users = users;
        return tripsService.getTripsData();
      })
      .then(function (trips) {
        vm.trips = trips;
        vm.tripsPagination.items = vm.trips;
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
        toaster.pop('success', "Opertion Completed", "User was created correctly");
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
        toaster.pop('success', "Opertion Completed", "Trip was created correctly");
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
          item: function () {
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
            toaster.pop('success', "Opertion Completed", "Trip was removed correctly");
          })
          .catch(function ( err ) {
            console.error(err);
          })


        }
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    }

    vm.RemoveUser = function ( user ) {
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/carpool/admin/confirm/confirm.modal.html',
        controller: 'confirmModalController',
        controllerAs: 'vm',
        size: 'lg',
        resolve: {
          item: function () {
            return user;
          }
        }
      });

      modalInstance.result.then(function (response) {
        console.log('Remove user?:', response);
        if ( response === true ) {

          usersService.DeleteUser( user )
          .then(function ( response ) {
            for (var i = 0; i < vm.users.length; i++) {
              if ( vm.users[i].id === user.id ) vm.users.splice(i, 1);
            }
            console.log('Removed User');
            toaster.pop('success', "Opertion Completed", "User was deleted correctly");
          })
          .catch(function ( err ) {
            console.error(err);
          })


        }
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    }

    vm.getPageNegativeLimit = function ( elements, currentPage, pageItems ) {

      var top = currentPage * pageItems;

      if ( top <= elements.length ) return pageItems;

      return Math.abs(top - elements.length - pageItems);
    }


    init();



  }
})();

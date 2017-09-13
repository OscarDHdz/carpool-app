(function () {
  'use_strict';

  angular.module('app.carpool')
    .controller('userModalController', ['usersService', '$uibModal', userModalController]);

  function userModalController( usersService, tripsService, $uibModal ) {
    var vm = this;

    function init() {
      console.log('userModalController loaded');
    }
    init();



  }
})();

(function () {
  'use_strict';

  angular.module('app')
    .controller('loginController', ['$scope', '$location', 'authService', loginController]);

  function loginController( $scope, $location, authService ) {
    var vm = this;
    vm.data = {}
    vm.loading = false;


    function init() {
      console.log('loginController loaded');


    }

    vm.login = function () {
      vm.loading = true;

      authService.LogIn(vm.data)
      .then(function ( auth ) {
        vm.loading = false;
        $location.path('/home');
      })
      .catch(function ( err ) {
        vm.loading = false;
        console.error(err);
      })

    }

    init();



  }
})();

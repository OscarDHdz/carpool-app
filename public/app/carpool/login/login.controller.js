(function () {
  'use_strict';

  angular.module('app')
    .controller('loginController', ['authService', loginController]);

  function loginController( authService ) {
    var vm = this;




    function init() {
      console.log('loginController loaded');


    }


    init();



  }
})();

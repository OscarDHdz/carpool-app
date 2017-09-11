(function () {
  'use_strict';

  angular.module('app.carpool')
    .controller('homeController', [homeController]);

  function homeController() {
    var vm = this;

    init();

    function init() {
      console.log('homeController loaded');
    }


  }
})();

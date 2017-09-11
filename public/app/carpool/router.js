(function () {
  'use_strict';

  angular.module('app.carpool', ['ngRoute'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: "app/carpool/home/home.html",
        controller: 'homeController',
        controllerAs: 'vm',
        activetab: 'home'
      })
      .otherwise({
        redirectTo: '/'
      });
    })

})();

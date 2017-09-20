(function () {
  'use_strict';

  angular.module('app.carpool', ['ngRoute'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: "app/carpool/home/home.html",
        controller: 'homeController',
        controllerAs: 'vm',
        activetab: 'home'
      })
      .when('/admin', {
        templateUrl: 'app/carpool/admin/admin.html',
        controller: 'adminController',
        controllerAs: 'vm',
        activetab: 'admin'
      })
      .when('/login', {
        templateUrl: 'app/carpool/login/login.html',
        controller: 'loginController',
        controllerAs: 'vm',
        activetab: 'login'
      })
      .otherwise({
        redirectTo: '/home'
      });
    })



})();

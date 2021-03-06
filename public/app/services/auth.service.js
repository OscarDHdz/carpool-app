(function () {
  'use_strict';

  angular.module('app')
  .factory('authService', ['$q', 'resourceService', function ($q, resourceService) {

    var data = {
      granted: false,
      token: null,
      auth: '',
    }

    var LogIn = function ( credential ) {

      var deferred = $q.defer();


      var resource = resourceService.getItems('login');

      resource.post({}, credential, function (authResponse) {
        data.granted = authResponse.granted;
        data.token = authResponse.token;
        data.auth = authResponse.auth;
        console.log(data);
        deferred.resolve(true);
      }, function (err) {
        console.error(err);
        data.granted = false;
        deferred.resolve(false);
      })


      return deferred.promise;

    }




    return {
      LogIn: LogIn,
      data: data
    }

  }]);



})();

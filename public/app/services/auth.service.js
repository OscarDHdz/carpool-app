(function () {
  'use_strict';

  angular.module('app')
  .factory('authService', ['$q', 'resourceService', function ($q, resourceService) {

    var data = {
      granted: false,
      token: null
    }

    var LogIn = function ( credential ) {

      var deferred = $q.defer();


      var resource = resourceService.getItems('login');

      resource.post({}, credential, function (authResponse) {
        console.log(data);
        data.granted = authResponse.granted;
        data.token = authResponse.token;
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

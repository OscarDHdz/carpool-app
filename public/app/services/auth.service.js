(function () {
  'use_strict';

  angular.module('app')
  .factory('authService', ['$q', 'resourceService', function ($q, resourceService) {

    var data = {
      granted: false,
    }

    var LogIn = function ( credential ) {

      var deferred = $q.defer();

      setTimeout(function () {

        if ( credential.username === 'admin' && credential.password === 'admin' ) {
          data.granted = true;
          deferred.resolve(true);
        }
        else {
          data.granted = false;
          deferred.reject(false);
        }

      }, 1000);

      return deferred.promise;

    }




    return {
      LogIn: LogIn,
      data: data
    }

  }]);



})();

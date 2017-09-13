(function () {
  'use_strict';

  angular.module('app')
  .factory('usersService', ['$q', 'resourceService', function ($q, resourceService) {

    var data = {
      users: {}
    }

    var getUsers = function (  ) {
      var deferred = $q.defer();

      if ( Object.keys(data.users).length > 0 ) deferred.resolve(data.users);
      else {
        var resource = resourceService.getItems('users');
        resource.get({},function ( response ) {
          console.log('Retrived users data:', response);
          data.users = response.users;
          deferred.resolve(response.users);
        }, function (err) {
          deferred.reject(err);
        })
      }
      return deferred.promise;
    }

    var CreateUser = function ( user ) {
      var deferred = $q.defer();

        var resource = resourceService.getItems('users');
        resource.post({}, user, function ( response ) {
          console.log('Submitted user data:', response);
          deferred.resolve(true);
        }, function (err) {
          deferred.reject(err);
        })

      return deferred.promise;
    }

    return {
      getUsers: getUsers,
      CreateUser: CreateUser,
      data: data,
    }

  }]);



})();

(function () {
  'use_strict';

  angular.module('app')
  .factory('usersService', ['$q', 'resourceService', 'authService', function ($q, resourceService, authService) {

    var data = {
      users: {}
    }

    var getUsers = function (  ) {
      var deferred = $q.defer();

      if ( Object.keys(data.users).length > 0 ) deferred.resolve(data.users);
      else {
        var resource = resourceService.getItems('users', null, authService.data.token);
        resource.get({},function ( response ) {
          console.log('Retrived users data:', response);
          data.users = response.users;
          for (var i = 0; i < data.users.length; i++) {
            data.users[i] = new User(data.users[i])
          }
          deferred.resolve(response.users);
        }, function (err) {
          deferred.reject(err);
        })
      }
      return deferred.promise;
    }

    var CreateUser = function ( user ) {
      var deferred = $q.defer();

        var resource = resourceService.getItems('users', null, authService.data.token);
        resource.post({}, user, function ( response ) {
          console.log('Submitted user data:', response);
          deferred.resolve(response.id);
        }, function (err) {
          deferred.reject(err);
        })

      return deferred.promise;
    }

    var SaveUser = function ( user ) {
      var deferred = $q.defer();

        var resource = resourceService.getItems('users', user, authService.data.token);
        resource.patch({}, user, function ( response ) {
          console.log('Updated user data:', response);
          deferred.resolve(true);
        }, function (err) {
          deferred.reject(err);
        })

      return deferred.promise;
    }

    var DeleteUser = function ( user ) {

      var deferred = $q.defer();

        var resource = resourceService.getItems('users', user, authService.data.token);
        resource.delete({}, user, function ( response ) {
          console.log('Removed user data:', response);
          deferred.resolve(true);
        }, function (err) {
          deferred.reject(err);
        })


      return deferred.promise;

    }

    return {
      getUsers: getUsers,
      CreateUser: CreateUser,
      SaveUser: SaveUser,
      DeleteUser: DeleteUser,
      data: data,
    }

  }]);



})();

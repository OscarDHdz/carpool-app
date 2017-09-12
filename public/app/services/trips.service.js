(function () {
  'use_strict';

  angular.module('app')
  .factory('tripsService', ['$q', 'resourceService', function ($q, resourceService) {

    var data = {
      trips: {}
    }

    var getTrips = function () {
      var deferred = $q.defer();
      var resource = resourceService.getItems('trips');

      resource.get({},function ( data ) {
        console.log('HERE0', data);
        deferred.resolve(data.trips);
      }, function (err) {
        deferred.reject(err);
      })



      return deferred.promise;
    }

    return {
      getTrips: getTrips,
      data: data,
    }

  }]);



})();

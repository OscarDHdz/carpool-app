(function () {
  'use_strict';

  angular.module('app')
  .factory('tripsService', ['$q', 'resourceService', function ($q, resourceService) {

    var data = {
      trips: {}
    }

    var getTrips = function (  ) {
      var deferred = $q.defer();

      if ( Object.keys(data.trips).length > 0 ) deferred.resolve(data.trips);
      else {
        var resource = resourceService.getItems('trips');
        resource.get({},function ( response ) {
          console.log('Retrived trips:', response.trips);
          data.trips = response.trips;
          deferred.resolve(response.trips);
        }, function (err) {
          deferred.reject(err);
        })
      }



      return deferred.promise;
    }

    return {
      getTrips: getTrips,
      data: data,
    }

  }]);



})();

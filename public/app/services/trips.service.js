(function () {
  'use_strict';

  angular.module('app')
  .factory('tripsService', ['$q', 'resourceService', function ($q, resourceService) {

    var data = {
      trips: {}
    }

    var getTripsData = function (  ) {
      var deferred = $q.defer();

      if ( Object.keys(data.trips).length > 0 ) deferred.resolve(data.trips);
      else {
        var resource = resourceService.getItems('trips');
        resource.get({},function ( response ) {
          console.log('Retrived trips data:', response);
          data.trips = response.trips;
          deferred.resolve(data.trips);
        }, function (err) {
          deferred.reject(err);
        })
      }



      return deferred.promise;
    }

    return {
      getTripsData: getTripsData,
      data: data,
    }

  }]);



})();

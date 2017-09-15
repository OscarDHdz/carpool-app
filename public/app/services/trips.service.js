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
          for (var i = 0; i < data.trips.length; i++) {
            data.trips[i] = new Trip(data.trips[i]);
          }
          deferred.resolve(data.trips);
        }, function (err) {
          deferred.reject(err);
        })
      }



      return deferred.promise;
    }

    var CreateTrip = function ( trip ) {
      var deferred = $q.defer();

        var resource = resourceService.getItems('trips');
        resource.post({}, trip, function ( response ) {
          console.log('Submitted trip data:', response);
          deferred.resolve(response.id);
        }, function (err) {
          deferred.reject(err);
        })

      return deferred.promise;
    }

    var SaveTrip = function ( trip ) {
      var deferred = $q.defer();

        var resource = resourceService.getItems('trips', trip);
        resource.patch({}, trip, function ( response ) {
          console.log('Updated trip data:', response);
          deferred.resolve(true);
        }, function (err) {
          deferred.reject(err);
        })

      return deferred.promise;
    }

    return {
      getTripsData: getTripsData,
      CreateTrip: CreateTrip,
      SaveTrip: SaveTrip,
      data: data,
    }

  }]);



})();

(function () {
  'use_strict';

  angular.module('app')
  .factory('tripsService', ['$q', function ($q) {

    var data = {
      trips: {
        "2017-09-11": {
          "Trabajo": {
            cost: "85",
            travelers: [
              {
                  "id": 8,
                  "user_id": 1,
                  "destiny": 0,
                  "cost": "75.00",
                  "payed": false,
                  "date": "2017-09-11T00:00:00.000Z",
                  "created_at": "2017-09-11T17:38:28.585Z",
                  "updated_at": "2017-09-11T17:38:28.585Z"
              },
              {
                  "id": 9,
                  "user_id": 2,
                  "destiny": 0,
                  "cost": "75.00",
                  "payed": false,
                  "date": "2017-09-11T00:00:00.000Z",
                  "created_at": "2017-09-11T17:38:28.586Z",
                  "updated_at": "2017-09-11T17:38:28.586Z"
              }
            ]
          },
          "Casa": {
            cost: "50",
            travelers: [
              {
                  "id": 8,
                  "user_id": 1,
                  "destiny": 0,
                  "cost": "75.00",
                  "payed": false,
                  "date": "2017-09-11T00:00:00.000Z",
                  "created_at": "2017-09-11T17:38:28.585Z",
                  "updated_at": "2017-09-11T17:38:28.585Z"
              },
            ]
          }
        }


      }
    }

    var getCurrentWeekTrips = function () {
      var deferred = $q.defer();

      deferred.resolve(data.trips);


      return deferred.promise;
    }

    return {
      getCurrentWeekTrips: getCurrentWeekTrips,
      data: data,
    }

  }]);



})();

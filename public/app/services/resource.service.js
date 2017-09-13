(function () {
  'use_strict';

  angular.module('app')
  .factory('resourceService', ['$resource', function ($resource) {

    var REST_URL = 'http://localhost:3000/_api/v1/';

    var getItems = function ( table ) {
      return $resource(REST_URL + table, {},
            {
                get: {
                    method: 'GET',
                    // params: {
                    //     '$select': params.select,
                    //     '$expand': params.expand,
                    //     '$orderby': params.order,
                    //     '$filter': filter,
                    //     '@target': '\'' + spContext.hostWeb.url + '\''
                    // },
                    headers: {
                        'Accept': 'application/json;odata=verbose;'
                    }
                },
                post: {
                  method: 'POST',
                  data: {oscar: 123},
                  headers: {
                      'Accept': 'application/json;odata=verbose;'
                  }
                }
            });
    }

    return {
      getItems: getItems
    }

  }]);



})();

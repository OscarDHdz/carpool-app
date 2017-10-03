(function () {
  'use_strict';

  angular.module('app')
  .factory('resourceService', ['$resource', function ($resource) {

    var REST_URL = '/_api/v1/';

    var getItems = function ( table, item ) {
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
                  headers: {
                      'Accept': 'application/json;odata=verbose;'
                  }
                },
                patch: {
                  method: 'PATCH',
                  url: REST_URL + table + ( item ? '/' + item.id : ''),
                  headers: {
                      'Accept': 'application/json;odata=verbose;'
                  }
                },
                delete: {
                  method: 'DELETE',
                  url: REST_URL + table + ( item ? '/' + item.id : ''),
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

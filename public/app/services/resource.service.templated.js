(function () {
    'use_strict';

    angular.module('app')
    .factory('resourceService', ['$resource', function ($resource) {

      var REST_URL = '/_api/v1/';

      var getItems = function ( table, item, token ) {
        return $resource(REST_URL + table, {},
              {
                  get: {
                      method: 'GET',
                      headers: {
                          'Accept': 'application/json;odata=verbose;',
                          'x-auth': token
                      }
                  },
                  post: {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json;odata=verbose;',
                        'x-auth': token
                    }
                  },
                  patch: {
                    method: 'PATCH',
                    url: REST_URL + table + ( item ? '/' + item.id : ''),
                    headers: {
                        'Accept': 'application/json;odata=verbose;',
                        'x-auth': token
                    }
                  },
                  delete: {
                    method: 'DELETE',
                    url: REST_URL + table + ( item ? '/' + item.id : ''),
                    headers: {
                        'Accept': 'application/json;odata=verbose;',
                        'x-auth': token
                    }
                  }
              });
      }

      return {
        getItems: getItems
      }

    }]);



  })();

  
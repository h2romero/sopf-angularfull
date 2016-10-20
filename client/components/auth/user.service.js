'use strict';

angular.module('sopfApp')
  .factory('User', function ($resource, envService) {
    var url = envService.read("apiUrl");
    return $resource(url + '/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });

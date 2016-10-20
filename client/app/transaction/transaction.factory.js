'use strict';

angular.module('sopfApp')
  .factory('TransFactory', function ($http, envService) {
    var url = envService.read("apiUrl");
    return {
      all:  function(id){
        $http.get(url + '/api/transactions/' + id).then(function(response){
          return response.data;
        });
      }
    };
  });

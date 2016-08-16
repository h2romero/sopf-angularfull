'use strict';

angular.module('sopfApp')
  .factory('TransFactory', function ($http) {
    return {
      all:  function(id){
        $http.get('/api/transactions/' + id).then(function(response){
          return response.data;
        });
      }
    };
  });

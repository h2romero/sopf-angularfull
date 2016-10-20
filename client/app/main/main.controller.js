'use strict';

angular.module('sopfApp')
  .controller('MainCtrl', function ($scope, $http, socket, envService) {
    $scope.awesomeThings = [];
    var url = envService.read("apiUrl");

    $http.get(url + '/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post(url + '/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete(url + '/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });

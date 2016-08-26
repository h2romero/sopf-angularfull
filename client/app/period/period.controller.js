'use strict';

angular.module('sopfApp')
  .controller('PeriodCtrl', function ($scope, $http, $location, socket, Auth) {
    var vm = this;
    vm.period = {};
    vm.period.owner = Auth.getCurrentUser()._id;
    vm.savePeriod = function() {
      $http.post('api/periods', vm.period).then(function() {
        $location.path('/periods');
      });
    }

    $http.get('/api/periods/' + Auth.getCurrentUser()._id).success(function(periods) {
      vm.periods = periods;
      socket.syncUpdates('period', vm.periods);
    });
  });


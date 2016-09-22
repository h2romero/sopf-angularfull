'use strict';

angular.module('sopfApp')
  .controller('PeriodCtrl', function ($scope, $http, $location, socket, Auth, sharedProperties) {
    var vm = this;
    vm.period = {};
    vm.period.owner = Auth.getCurrentUser()._id;
    vm.periodTab = true;

    vm.savePeriod = function() {
      $http.post('api/periods', vm.period).then(function() {
        $location.path('/periods');
      });
    }

    vm.updatePeriod = function(period) {
      $http.put('api/periods/' + period._id, period).then(function() {
        sharedProperties.setValue('period', period);
        $location.path('/periods');
      });
    }

    $http.get('/api/periods/' + Auth.getCurrentUser()._id).success(function(periods) {
      vm.periods = periods;
      socket.syncUpdates('period', vm.periods);
    });
  });


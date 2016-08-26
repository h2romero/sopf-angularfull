'use strict';

angular.module('sopfApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('period', {
        url: '/periods',
        templateUrl: 'app/period/period.html',
        controller: 'PeriodCtrl',
        controllerAs: 'vm'
      });
  });

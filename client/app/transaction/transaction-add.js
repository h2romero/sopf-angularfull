'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionAddCtrl
 * @description
 * # TransactionAddCtrl
 * Controller of the clientApp
 */
angular.module('sopfApp')
  .controller('TransactionAddCtrl', function ($scope, $http, $location, $timeout, socket, Auth, sharedProperties) {
    var vm = this;
    vm.transaction = {};
    // vm.periods = null;
    // vm.period = null;
    vm.transaction.dueDate = Date.now();
    vm.transaction.owner = Auth.getCurrentUser()._id;
    vm.periods = sharedProperties.getValue('periods');
    $timeout(function() {
      vm.period = sharedProperties.getValue('period');
      if (!vm.period) {
        vm.periods = [{
          readableName: 'Unnamed Period',
          description: 'N/A'
        }]
        vm.period = vm.periods[0];
      }

    }, 10);

    vm.savePeriod = function() {
      if (!vm.period._id){
        vm.period.owner = Auth.getCurrentUser()._id;
        $http.post('api/periods', vm.period).then(function(res) {
          vm.period = res.data;
        });
      }
    }

    vm.saveTransaction = function() {
      vm.savePeriod();
      $timeout(function() {
        vm.transaction.period = vm.period._id;
        $http.post('api/transactions', vm.transaction).then(function() {
          sharedProperties.setValue('period', vm.period);
          $location.path('/transactions');
        });
      }, 1000);

    }

    vm.transaction.tags = [];

    vm.addTag = function() {
      if (vm.tagText == null || vm.tagText.length == 0) {
        return;
      }
      vm.transaction.tags.push({name: vm.tagText});
      vm.tagText = '';
    }

    vm.deleteTag = function(key) {
      if (vm.transaction.tags.length > 0 &&
        (vm.tagText == null || vm.tagText.length == 0) &&
        key === undefined) {
        vm.transaction.tags.pop();
      } else if (key != undefined) {
        vm.transaction.tags.splice(key, 1);
      }
    }
  });

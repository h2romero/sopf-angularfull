'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionAddCtrl
 * @description
 * # TransactionAddCtrl
 * Controller of the clientApp
 */
angular.module('sopfApp')
  .controller('TransactionAddCtrl', function ($scope, $http, $location, socket, Auth, sharedProperties) {
    var vm = this;
    vm.transaction = {};
    vm.transaction.dueDate = Date.now();
    vm.transaction.owner = Auth.getCurrentUser()._id;
    vm.period = sharedProperties.getValue('period');

    vm.getPeriods = function () {
      $http.get('/api/periods/' + Auth.getCurrentUser()._id).success(function(periods) {
        vm.periods = periods;
        // vm.period = sharedProperties.getValue('period');
        socket.syncUpdates('period', vm.periods);
      });
    }

    vm.getPeriods();

    vm.saveTransaction = function() {
      //Transaction.post(vm.transaction).then(function() {
      //  $location.path('/transactions');
      //});
      vm.transaction.period = vm.period;
      $http.post('api/transactions', vm.transaction).then(function() {
        sharedProperties.setValue('period', vm.period);
        $location.path('/transactions');
      });
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

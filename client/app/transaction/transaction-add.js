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
          id: 0,
          readableName: 'Unnamed Period'
        }]
        vm.period = vm.periods[0];
      }

    }, 10);

    // vm.getPeriods = function () {
    //   $http.get('/api/periods/' + Auth.getCurrentUser()._id).success(function(periods) {
    //     vm.periods = periods;
    //     vm.period = sharedProperties.getValue('period');
    //     socket.syncUpdates('period', vm.periods);
    //   });
    // }
    //
    // vm.getPeriods();

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

'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionEditCtrl
 * @description
 * # TransactionEditCtrl
 * Controller of the clientApp
 */
angular.module('sopfApp')
  .controller('TransactionEditCtrl', function ($http, $stateParams, $location, $filter, Auth, socket, envService, sharedProperties) {
    var vm = this;
    vm.transaction = {};
    vm.editTransaction = true;
    var url = envService.read("apiUrl");
    vm.periods = sharedProperties.getValue('periods');
    //Transaction.one($stateParams.id).get().then(function(transaction) {
    //  vm.transaction = transaction;
    //  vm.saveTransaction = function () {
    //    vm.transaction.save().then(function() {
    //      $location.path('/transaction/' + $stateParams.id);
    //    })
    //  }
    //});

    $http.get(url + '/api/transactions/'+ $stateParams.id).success(function(transaction){
      vm.transaction = transaction;
      vm.saveTransaction = function () {
        $http.put('/api/transactions/' + vm.transaction._id, vm.transaction).then(function() {
          $location.path('/transactions');
        });
      }
    });

    vm.cloneTransactions = function (period) {
      $http.put(url + '/api/transactions/' + vm.transaction._id, vm.transaction).then(function() {
        $location.path('/transactions');
      });
    }

    // vm.saveTransaction = function () {
    //   vm.transaction.period = vm.period;
    //   $http.put('/api/transactions/' + vm.transaction._id, vm.transaction).then(function() {
    //     $location.path('/transactions');
    //   });
    // }

    vm.getPeriods = function () {
      $http.get(url + '/api/periods/' + Auth.getCurrentUser()._id).success(function(periods) {
        vm.periods = periods;
        sharedProperties.setValue('periods', periods);
        //vm.period = !sharedProperties.getValue('period') ? vm.periods[vm.periods.length -1] : sharedProperties.getValue('period');
        vm.period = $filter('filter')(periods, {_id: vm.transaction.period }).pop();
        socket.syncUpdates('period', vm.periods);
      });
    }

    vm.getPeriods();

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

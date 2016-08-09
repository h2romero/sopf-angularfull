'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionAddCtrl
 * @description
 * # TransactionAddCtrl
 * Controller of the clientApp
 */
angular.module('sopfApp')
  .controller('TransactionAddCtrl', function ($scope, $http, $location, socket, Auth) {
    var vm = this;
    vm.transaction = {};
    vm.transaction.dueDate = Date.now();
    vm.transaction.owner = Auth.getCurrentUser()._id;
    vm.saveTransaction = function() {
      //Transaction.post(vm.transaction).then(function() {
      //  $location.path('/transactions');
      //});
      $http.post('api/transactions', vm.transaction).then(function() {
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

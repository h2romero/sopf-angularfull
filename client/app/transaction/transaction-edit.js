'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionEditCtrl
 * @description
 * # TransactionEditCtrl
 * Controller of the clientApp
 */
angular.module('sopfApp')
  .controller('TransactionEditCtrl', function ($http, $stateParams, $location, Auth) {
    var vm = this;
    vm.transaction = {};
    vm.editTransaction = true;
    //Transaction.one($stateParams.id).get().then(function(transaction) {
    //  vm.transaction = transaction;
    //  vm.saveTransaction = function () {
    //    vm.transaction.save().then(function() {
    //      $location.path('/transaction/' + $stateParams.id);
    //    })
    //  }
    //});
    $http.get('api/transactions/' + Auth.getCurrentUser()._id + '/' + $stateParams.id).success(function(transaction){
      vm.transaction = transaction;
      vm.saveTransaction = function () {
        $http.put('/api/transactions/' + vm.transaction._id, vm.transaction).then(function() {
          $location.path('/transactions');
        });
      }
    });

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

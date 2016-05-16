'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionEditCtrl
 * @description
 * # TransactionEditCtrl
 * Controller of the clientApp
 */
angular.module('sopfApp')
  .controller('TransactionEditCtrl', function ($http, $stateParams, $location) {
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
    $http.get('api/transactions/' + $stateParams.id).success(function(transaction){
      vm.transaction = transaction;
      vm.saveTransaction = function () {
        $http.put('/api/transactions/' + vm.transaction._id, vm.transaction).then(function() {
          $location.path('/transactions');
        });
      }
    });

  });

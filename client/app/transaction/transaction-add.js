'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionAddCtrl
 * @description
 * # TransactionAddCtrl
 * Controller of the clientApp
 */
angular.module('sopfApp')
  .controller('TransactionAddCtrl', function ($scope, $http, $location, socket) {
    var vm = this;
    vm.transaction = {};
    vm.transaction.dueDate = Date.now();
    vm.saveTransaction = function() {
      //Transaction.post(vm.transaction).then(function() {
      //  $location.path('/transactions');
      //});
      $http.post('api/transactions', vm.transaction).then(function() {
        $location.path('/transactions');
      });
    }
  });

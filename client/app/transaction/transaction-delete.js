'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionDeleteCtrl
 * @description
 * # TransactionDeleteCtrl
 * Controller of the clientApp
 */
angular.module('sopfApp')
  .controller('TransactionDeleteCtrl', function ($http, $stateParams, $location, Auth) {
    var vm = this;
    //vm.transaction = Transaction.one($routeParams.id).get().$object;
    $http.get('api/transactions/' + Auth.getCurrentUser()._id + '/' + $stateParams.id).success(function(transaction){
      vm.transaction = transaction;
    });

    vm.deleteTransaction = function() {
      $http.delete('/api/transactions/' + Auth.getCurrentUser()._id + '/' + vm.transaction._id).then(function() {
        $location.path('/transactions');
      });
    }
    vm.back = function() {
      $location.path('/transactions');
    }
  });

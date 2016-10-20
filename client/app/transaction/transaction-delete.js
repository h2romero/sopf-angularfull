'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionDeleteCtrl
 * @description
 * # TransactionDeleteCtrl
 * Controller of the clientApp
 */
angular.module('sopfApp')
  .controller('TransactionDeleteCtrl', function ($http, $stateParams, $location, Auth, envService) {
    var vm = this;
    var url = envService.read("apiUrl");
    //vm.transaction = Transaction.one($routeParams.id).get().$object;
    $http.get(url + 'api/transactions/' + $stateParams.id).success(function(transaction){
      vm.transaction = transaction;
    });

    vm.deleteTransaction = function() {
      $http.delete(url + '/api/transactions/' + vm.transaction._id).then(function() {
        $location.path('/transactions');
      });
    }
    vm.back = function() {
      $location.path('/transactions');
    }
  });

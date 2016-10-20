'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionViewCtrl
 * @description
 * # TransactionViewCtrl
 * Controller of the clientApp
 */
angular.module('sopfApp')
  .controller('TransactionViewCtrl', function ($http, $stateParams, Auth, envService) {
    var vm = this;
    vm.viewTransaction = true;
    var url = envService.read("apiUrl");
    //vm.transaction = Transaction.one($routeParams.id).get().$object;
    $http.get(url + 'api/transactions/' + Auth.getCurrentUser()._id + '/' + $stateParams.id).success(function(transaction){
      vm.transaction = transaction;
    });
  });

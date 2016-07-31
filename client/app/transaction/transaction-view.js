'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionViewCtrl
 * @description
 * # TransactionViewCtrl
 * Controller of the clientApp
 */
angular.module('sopfApp')
  .controller('TransactionViewCtrl', function ($http, $stateParams, Auth) {
    var vm = this;
    vm.viewTransaction = true;
    //vm.transaction = Transaction.one($routeParams.id).get().$object;
    $http.get('api/transactions/' + Auth.getCurrentUser()._id + '/' + $stateParams.id).success(function(transaction){
      vm.transaction = transaction;
    });
  });

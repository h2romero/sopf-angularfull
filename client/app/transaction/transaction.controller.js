'use strict';

angular.module('sopfApp')
  .controller('TransactionCtrl', function ($scope, $http, $stateParams, $location, socket, Auth) {
    var vm = this;
    $http.get('/api/transactions/' + Auth.getCurrentUser()._id).success(function(transactions) {
    //$http.get('/api/transactions').success(function(transactions) {
      vm.transactions = transactions;
      socket.syncUpdates('transaction', vm.transactions);
    });

  vm.saveTransaction = function (transaction) {
    $http.put('/api/transactions/' + transaction._id, transaction).then(function() {
      $location.path('/transactions');
    });
  }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('transaction');
    });
  });

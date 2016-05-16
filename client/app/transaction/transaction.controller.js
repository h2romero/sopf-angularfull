'use strict';

angular.module('sopfApp')
  .controller('TransactionCtrl', function ($http, socket) {
    var vm = this;
    $http.get('/api/transactions').success(function(transactions) {
      vm.transactions = transactions;
      socket.syncUpdates('transaction', vm.transactions);
    });

  });

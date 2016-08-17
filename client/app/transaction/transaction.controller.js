'use strict';

angular.module('sopfApp')
  .controller('TransactionCtrl', function ($scope, $http, $stateParams, $location, socket, Auth) {
    var vm = this;

    $http.get('/api/transactions/' + Auth.getCurrentUser()._id).success(function(transactions) {
      vm.transactions = transactions;
      socket.syncUpdates('transaction', vm.transactions);
    });

    vm.saveTransaction = function (transaction) {
      $http.put('/api/transactions/' + transaction._id, transaction).then(function() {
        $location.path('/transactions');
      });
    }

    //vm.transactions.tags = [];

    vm.addTag = function(transaction) {
      if (transaction.tagText == null || transaction.tagText.length == 0) {
        return;
      }
      transaction.tags.push({name: transaction.tagText});
      transaction.tagText = '';
      vm.saveTransaction(transaction);
    }

    vm.deleteTag = function(key, transaction) {
      if (transaction.tags.length > 0 &&
        (vm.tagText == null || vm.tagText.length == 0) &&
        key === undefined) {
        transaction.tags.pop();
      } else if (key != undefined) {
        transaction.tags.splice(key, 1);
      }
      vm.saveTransaction(transaction);
    }

    vm.sortType     = 'account'; // set the default sort type
    vm.sortReverse  = false;  // set the default sort order
    vm.searchTransaction   = '';     // set the default search/filter term


    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('transaction');
    });
  });

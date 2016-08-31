'use strict';

angular.module('sopfApp')
  .controller('TransactionCtrl', function ($scope, $http, $stateParams, $location, $filter, socket, Auth, sharedProperties) {
    var vm = this;

    vm.getPeriods = function () {
      $http.get('/api/periods/' + Auth.getCurrentUser()._id).success(function(periods) {
        vm.periods = periods;
        //vm.period = $filter('filter')(periods, {_id: sharedProperties.getValue('period') }).pop();
        vm.period = !sharedProperties.getValue('period') ? vm.periods[vm.periods.length -1] : sharedProperties.getValue('period');
        vm.getTransactions();
        socket.syncUpdates('period', vm.periods);
      });
    }

    vm.getTransactions = function () {
      $http.get('/api/transactions/' + Auth.getCurrentUser()._id + '/' + vm.period._id).success(function(transactions) {
        vm.transactions = transactions;
        //sharedProperties.setValue('period', vm.period._id);
        sharedProperties.setValue('period', vm.period);
        socket.syncUpdates('transaction', vm.transactions);
      });
    }

    vm.getPeriods();

    vm.saveTransaction = function (transaction, period) {
      transaction.period = period
      $http.put('/api/transactions/' + transaction._id, transaction).then(function() {
        vm.getTransactions()
        //$location.path('/transactions');
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

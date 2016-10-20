'use strict';

angular.module('sopfApp')
  .controller('TransactionCtrl', function ($scope, $http, $stateParams, $location, $filter, $q, socket, Auth, envService, sharedProperties) {
    var vm = this;
    var url = envService.read("apiUrl");

    vm.transactionTransaction = true;
    //vm.period = null;
    vm.periods = sharedProperties.getValue('periods');

    vm.getPeriods = function () {
      $http.get(url + '/api/periods/' + Auth.getCurrentUser()._id).success(function(periods) {
        vm.periods = periods;
        sharedProperties.setValue('periods', periods);
        //vm.period = $filter('filter')(periods, {_id: sharedProperties.getValue('period') }).pop();
        vm.period = !sharedProperties.getValue('period') ? vm.periods[vm.periods.length -1] : sharedProperties.getValue('period');
        vm.getTransactions(vm.period);
        socket.syncUpdates('period', vm.periods);
      });
    }

    vm.getTransactions = function (period) {
      $http.get(url + '/api/transactions/' + Auth.getCurrentUser()._id + '/' + period._id).success(function(transactions) {
        vm.transactions = transactions;
        //sharedProperties.setValue('period', vm.period._id);
        sharedProperties.setValue('period', period);
        socket.syncUpdates('transaction', vm.transactions);
      });
    }

    vm.getPeriods();

    vm.filterObjectList = function(userInput) {
      var filter = $q.defer();
      var normalisedInput = userInput.toLowerCase();

      var filteredArray = vm.periods.filter(function(period) {
        var matchPeriodName = period.readableName.toLowerCase().indexOf(normalisedInput) === 0;
        return matchPeriodName;
      });

      filter.resolve(filteredArray);
      return filter.promise;
    };

    vm.saveTransaction = function (transaction, period) {
      //vm.period = period
      $http.put('/api/transactions/' + transaction._id, transaction).then(function() {
        vm.getTransactions(period)
        //$location.path('/transactions');
      });
    }

    //vm.transactions.tags = [];

    vm.addTag = function(transaction, period) {
      if (transaction.tagText == null || transaction.tagText.length == 0) {
        return;
      }
      transaction.tags.push({name: transaction.tagText});
      transaction.tagText = '';
      vm.saveTransaction(transaction, period);
    }

    vm.deleteTag = function(key, transaction, period) {
      if (transaction.tags.length > 0 &&
        (vm.tagText == null || vm.tagText.length == 0) &&
        key === undefined) {
        transaction.tags.pop();
      } else if (key != undefined) {
        transaction.tags.splice(key, 1);
      }
      vm.saveTransaction(transaction, period);
    }

    vm.sortType     = 'account'; // set the default sort type
    vm.sortReverse  = false;  // set the default sort order
    vm.searchTransaction   = '';     // set the default search/filter term


    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('transaction');
    });

    vm.clonePeriod = function () {
      $http.get(url + '/api/transactions/clone/period/' + vm.period._id).success(function(period) {
        vm.period = period;
        vm.getTransactions(vm.period)
        sharedProperties.setValue('period', vm.period);
      });
    }
  });

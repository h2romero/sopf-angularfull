'use strict';

angular.module('sopfApp').controller("TransactionDashCtrl", function ($scope, $http, $q, $filter, $timeout, envService, Auth, sharedProperties, socket) {

  var vm = this;
  var url = envService.read("apiUrl")
  vm.period = null;
  //vm.periods = null;

  vm.totalAmount = 0;
  vm.dashTransaction = true;
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
    $http.get(url + '/api/transactions/' + Auth.getCurrentUser()._id + '/' + period._id).success(function (transactions) {
      vm.transactions = transactions;
      vm.transactions2 = vm.transactions;
      sharedProperties.setValue('period', period);
      if (vm.transactions.length > 0){
        $scope.getColumnChart(vm.transactions);
        $scope.getPieChart(vm.transactions);
      }
    });
  }

  vm.getPeriods();


  vm.search = function () {
    vm.transactions = $filter('filter')(vm.transactions2, vm.searchTransaction);
    $timeout(function(){
      if (vm.transactions.length > 0){
        $scope.getColumnChart(vm.transactions);
      }
    }, 50);

    $timeout(function(){
      if (vm.transactions.length > 0){
        $scope.getPieChart(vm.transactions);
      }
    }, 100);
  }

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

  $scope.getColumnChart = function (transactions) {
    var chart1 = {};
    chart1.type = "ColumnChart";
    chart1.data = {"cols": [
      {id: "t", label: "Account", type: "string"},
      {id: "s", label: "Amount", type: "number"}
    ], "rows": [
      {c: [
        {v: ""},
        {v: 0},
      ]}
    ]};
    vm.totalAmount = 0;
    angular.forEach(transactions, function (trans) {
      var v1 = {'v' : trans.account};
      var v2 = {'v' : trans.amount};
      var col = {'c' : [v1, v2]};
      chart1.data.rows.push(col);
      vm.totalAmount += trans.amount;
    });
    chart1.formatters = {
      number: [{
        columnNum: 1,
        pattern: "currency"
      }]
    };
    $scope.columnchart = chart1;
    $scope.columnchart.options = {
      'title': 'Transactions'
    };
  }

  $scope.getPieChart = function (transactions) {
    var chart1 = {};
    chart1.type = "PieChart";
    chart1.data = [
      ['Amount', 'Account']
    ];
    angular.forEach(transactions, function (trans) {
      chart1.data.push([trans.account, trans.amount]);
    });
    chart1.options = {
      displayExactValues: true,
      width: 500,
      height: 400,
      is3D: false,
      chartArea: { left: 10, top: 10, bottom: 0, height: "100%" }
    };
    chart1.formatters = {
      number: [{
        columnNum: 1,
        pattern: "$ #,##0.00"
      }]
    };
    $scope.piechart = chart1;
  }
});

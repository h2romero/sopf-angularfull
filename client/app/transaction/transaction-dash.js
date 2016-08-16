'use strict';

angular.module('sopfApp').controller("TransactionChartCtrl", function ($scope, $http, Auth) {
  $scope.totalAmount = 0;
  $http.get('/api/transactions/' + Auth.getCurrentUser()._id).success(function(transactions) {
    $scope.transactions = transactions;
    if ($scope.transactions.length > 0)
      $scope.getColumnChart();
      $scope.getPieChart();

  });
  $scope.getColumnChart = function () {
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
    angular.forEach($scope.transactions, function (trans) {
      var v1 = {'v' : trans.account};
      var v2 = {'v' : trans.amount};
      var col = {'c' : [v1, v2]};
      chart1.data.rows.push(col);
      $scope.totalAmount += trans.amount;
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

  $scope.getPieChart = function () {
    var chart1 = {};
    chart1.type = "PieChart";
    chart1.data = [
      ['Amount', 'Account']
    ];
    angular.forEach($scope.transactions, function (trans) {
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

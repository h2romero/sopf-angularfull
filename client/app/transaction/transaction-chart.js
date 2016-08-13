'use strict';

angular.module('sopfApp').controller("TransactionChartCtrl", function ($scope) {
    $scope.TransactionChart = {};

    $scope.TransactionChart.type = "ColumnChart";

    $scope.onions = [
      {v: "Onions"},
      {v: 3},
    ];

    $scope.TransactionChart.data = {"cols": [
      {id: "t", label: "Topping", type: "string"},
      {id: "s", label: "Slices", type: "number"}
    ], "rows": [
      {c: [
        {v: "Mushrooms"},
        {v: 3},
      ]},
      {c: $scope.onions},
      {c: [
        {v: "Olives"},
        {v: 31}
      ]},
      {c: [
        {v: "Zucchini"},
        {v: 1},
      ]},
      {c: [
        {v: "Pepperoni"},
        {v: 2},
      ]}
    ]};

    $scope.TransactionChart.options = {
      'title': 'How Much Pizza I Ate Last Night'
    };
  });

'use strict';

angular.module('sopfApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('transactions', {
        url: '/transactions',
        templateUrl: 'app/transaction/transaction.html',
        controller: 'TransactionCtrl',
        //controllerAs: 'transactions'
        controllerAs: 'vm'
      })
      .state('createTransaction', {
        url: '/create/transaction',
        templateUrl: 'app/transaction/transaction-add.html',
        controller: 'TransactionAddCtrl',
        //controllerAs: 'transactionAdd'
        controllerAs: 'vm'
      })
      .state('viewTransaction', {
        url: '/transaction/:id',
        templateUrl: 'app/transaction/transaction-view.html',
        controller: 'TransactionViewCtrl',
        //controllerAs: 'transactionView'
        controllerAs: 'vm'
      })
      .state('deleteTransaction', {
        url: '/transaction/:id/delete',
        templateUrl: 'app/transaction/transaction-delete.html',
        controller: 'TransactionDeleteCtrl',
        //controllerAs: 'transactionDelete'
        controllerAs: 'vm'
      })
      .state('editTransaction', {
        url: '/transaction/:id/edit',
        templateUrl: 'app/transaction/transaction-edit.html',
        controller: 'TransactionEditCtrl',
        //controllerAs: 'transactionEdit'
        controllerAs: 'vm'
      })
      .state('chartTransaction', {
        url: '/chart/transaction',
        templateUrl: 'app/transaction/transaction-chart.html',
        controller: 'TransactionChartCtrl'
        //controllerAs: 'transactionEdit'
        //controllerAs: 'vm'
      });
  });

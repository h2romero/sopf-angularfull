'use strict';

angular.module('sopfApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, envService, $window) {
    $scope.user = {};
    $scope.errors = {};
    var url = envService.read("apiUrl");

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/dash/transaction');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = url + '/auth/' + provider;
    };
  });

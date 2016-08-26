'use strict';

describe('Controller: PeriodCtrl', function () {

  // load the controller's module
  beforeEach(module('sopfApp'));

  var PeriodCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PeriodCtrl = $controller('PeriodCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

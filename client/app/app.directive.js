/**
 * Created by hectorromero on 8/22/16.
 */

angular.module('sopfApp')
  .service('sharedProperties', function () {
    var hashtable = {};

    return {
      setValue: function (key, value) {
        hashtable[key] = value;
      },
      getValue: function (key) {
        return hashtable[key];
      }
    }
  })
  .directive('autoFocus', function($timeout) {
  return {
    restrict: 'AC',
    link: function(_scope, _element) {
      $timeout(function(){
        _element[0].focus();
      }, 0);
    }
  };
});;

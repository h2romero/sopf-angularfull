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
  });

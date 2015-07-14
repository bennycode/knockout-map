(function (ko) {
  if (ko.observableMap) {
    console.warn('Knockout plugin installation skipped:\nThere is already another Knockout implementation for an observable map.');
  } else {
    ko.observableMap = function () {
      var map = {};
      var values = ko.observableArray([]);

      var _getValueByKey = function (key) {
        var index = map[key];
        if (index > -1) {
          return values()[index];
        } else {
          console.log('Key cannot be found.');
        }
      };

      return {
        _getMap: function () {
          return map;
        },
        _getValues: function () {
          return values();
        },
        get: function (key) {
          return _getValueByKey(key);
        },
        set: function (key, value) {
          if (map[key] === undefined) {
            values.push(value);
            var index = values.indexOf(value);
            console.log('Created new value ' + value + ' at position ' + index);
            map[key] = index;
          } else {
            console.log('Found existing value...');
            var index = map[key];
            if (index > -1) {
              values()[index] = value;
              values.valueHasMutated();
              console.log('Updated value to ' + value + ' at position ' + index);
            } else {
              console.log('oh oh');
            }
          }
        },
        subscribe: values.subscribe
      };
    };
  }
})(ko);
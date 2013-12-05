(function(ionic) {
'use strict';

angular.module('ionic.ui.radio', [])

// The radio button is a radio powered element with only
// one possible selection in a set of options.
.directive('radio', function() {
  return {
    restrict: 'E',
    replace: true,
    require: '?ngModel',
    scope: {
      value: '@'
    },
    transclude: true,
    template: '<label ng-click="tapHandler($event)" class="item item-radio">\
                <input type="radio" name="group">\
                <div class="item-content" ng-transclude>\
                </div>\
                <i class="radio-icon icon ion-checkmark"></i>\
              </label>',

    link: function($scope, $element, $attr, ngModel) {
      var radio;

      if(!ngModel) { return; }

      radio = $element.children().eq(0);

      if(!radio.length) { return; }

      $scope.tapHandler = function(e) {
        radio[0].checked = true;
        ngModel.$setViewValue($scope.$eval($attr.ngValue));
        e.alreadyHandled = true;
      };

      var clickHandler = function(e) {
        ngModel.$setViewValue($scope.$eval($attr.ngValue));
      };

      if(ngModel) {
        //$element.bind('tap', tapHandler);
        $element.bind('click', clickHandler);

        ngModel.$render = function() {
          var val = $scope.$eval($attr.ngValue);
          if(val === ngModel.$viewValue) {
            radio.attr('checked', 'checked');
          } else {
            radio.removeAttr('checked');
          }
        };
      }
    }
  };
})

// The radio button is a radio powered element with only
// one possible selection in a set of options.
.directive('radioButtons', function() {
  return {
    restrict: 'E',
    replace: true,
    require: '?ngModel',
    scope: {
      value: '@'
    },
    transclude: true,
    template: '<div class="button-bar button-bar-inline" ng-transclude></div>',

    link: function($scope, $element, $attr, ngModel) {
      var radio;


      if(ngModel) {
        //$element.bind('tap', tapHandler);

        ngModel.$render = function() {
          var val = $scope.$eval($attr.ngValue);
          if(val === ngModel.$viewValue) {
          } else {
          }
        };
        $scope.$parent.$on('button.toggled', function(e, element) {
          var c, children = $element.children();
          for(var i = 0; i < children.length; i++) {
            c = children[i];
            if(c != element[0]) {
              c.classList.remove('active');
            }
          }
        });
      }
    }
  };
})

.directive('button', function() {
  return {
    restrict: 'E',
    require: '?^ngModel',
    link: function($scope, $element, $attr, ngModel) {
      if(!ngModel) { return; }

      var setIt = function() {
        $element.addClass('active');
        ngModel.$setViewValue($scope.$eval($attr.ngValue));
        $scope.$emit('button.toggled', $element);
      };

      $scope.tapHandler = function(e) {
        setIt();
        e.alreadyHandled = true;
      };

      var clickHandler = function(e) {
        setIt();
      };
        
      $element.bind('click', clickHandler);
    }
  }
});

})(window.ionic);

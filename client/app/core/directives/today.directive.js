(function() {
    'use strict';
  
    angular
      .module('odontoweb.core')
      .directive('owIsToday', IsToday);
  
    function IsToday() {
      
     var directive = {
        restrict: 'C',
        scope: {
            "date": "="
        },
        link: function( $scope, $element, $attrs) {
            if($scope.date.date.isSame(moment(), 'day'))
                $element.addClass('cal-day-today');
        }
      };
  
      return directive;
      
    }
  
  
  })();
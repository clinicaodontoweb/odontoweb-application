(function() {
  'use strict';

  angular
    .module('odontoweb.core')
    .directive('owMenuUser', MenuUser);

  function MenuUser() {
    
   var directive = {
      restrict: 'E',
      templateUrl: 'partials/core/directives/menuuser.directive.html'
    };

    return directive;
    
  }
})();
(function() {
  'use strict';

  angular
    .module('odontoweb.core')
    .directive('owMenu', Menu);

  Menu.$inject = ['$location'];

  function Menu($location) {
    
    var directive = {
        link: link,
        restrict: 'A'
    };

    return directive;
    
    function link(scope, element, attrs) {
      var path = attrs.href;
      path = path.substring(1);
      scope.location = $location;
      scope.$watch('location.path()', function (newPath) {
        if (path.split("/")[1] === newPath.split("/")[1]) {
          $(element).parent().addClass('menu-ativo');
        } else {
          $(element).parent().removeClass('menu-ativo');
        }
      });
    }
  }
})();
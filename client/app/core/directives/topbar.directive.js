(function() {
  'use strict';

  angular
    .module('odontoweb.core')
    .directive('owTopbar', TopBar);

  function TopBar() {
    
   var directive = {
      restrict: 'E',
      templateUrl: 'partials/core/directives/topbar.directive.html',
      controller: TopBarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  TopBarController.$inject = ['$localStorage', '$rootScope'];

  function TopBarController($localStorage, $rootScope) {
    var vm = this;
    vm.$storage = $localStorage;

    // menu overlay toggle
    document.querySelector(".overlay-menu").addEventListener('click', $rootScope.toggleMenu);
  }

})();
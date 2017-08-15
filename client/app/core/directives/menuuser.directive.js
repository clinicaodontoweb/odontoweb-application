(function() {
  'use strict';

  angular
    .module('odontoweb.core')
    .directive('owMenuUser', MenuUser);

  function MenuUser() {
    
   var directive = {
      restrict: 'E',
      templateUrl: 'partials/core/directives/menuuser.directive.html',
      controller: MenuUserController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
    
  }

  MenuUserController.$inject = ['$localStorage'];

  function MenuUserController($localStorage) {
    var vm = this;
    vm.$storage = $localStorage;
  }


})();
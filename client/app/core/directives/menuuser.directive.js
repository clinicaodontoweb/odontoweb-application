(function() {
  'use strict';

  angular
    .module('odontoweb.core')
    .directive('owMenuUser', MenuUser);

  function MenuUser() {
    
   var directive = {
      restrict: 'E',
      templateUrl: 'partials/core/directives/menuuser.directive.html',
      scope: {
        tenants: '=',
        tenant: '=',
        usuario: '=',
        sair: '=',
        trocar: '='
      },
      controller: MenuUserController,
      controllerAs: 'vm'
    };

    return directive;
    
  }

  function MenuUserController() {
    var vm = this;
  }


})();
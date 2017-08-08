(function() {
  'use strict';

  angular
    .module('odontoweb.core')
    .directive('owTopbar', TopBar);

  function TopBar() {
    
   var directive = {
      restrict: 'E',
      templateUrl: 'partials/core/directives/topbar.directive.html',
      scope: {
        tenant: '='
      },
      controller: TopbarController,
      controllerAs: 'vm'
    };

    return directive;

    TopbarController.$inject = ['$scope', '$rootScope'];
  
    function TopbarController($scope, $rootScope) {
      var vm = this;
      vm.toggleMenu = toggleMenu;
      vm.isLoggedIn = $rootScope.isLoggedIn;

      $rootScope.$on('logout', function() {
        toggleMenu();
      });
      $rootScope.$on('changeTenant', function() {
        toggleMenu();
      });

      function toggleMenu() {
        if(document.querySelector(".menu-user").style.display == 'none' || document.querySelector(".menu-user").style.display == '') {
          document.querySelector(".menu-user").style.display = 'block';
          document.querySelector(".menu-user").style.width = '250px';
          document.querySelector("#topbar__profile-btn").innerText = 'keyboard_arrow_up';
        }else {
          document.querySelector(".menu-user").style.width = 0;
          setTimeout(function() {
            document.querySelector(".menu-user").style.display = 'none';
          }, 200);
          document.querySelector("#topbar__profile-btn").innerText = 'keyboard_arrow_down';
        }
      }

    }
  }
})();
(function() {
  'use strict';

  angular
    .module('odontoweb.core')
    .directive('owTopbar', TopBar);

  function TopBar() {
    
   var directive = {
      restrict: 'E',
      templateUrl: 'partials/core/directives/topbar.directive.html',
      bindToController: true,
      controller: TopbarController,
      controllerAs: 'vm',
    };

    return directive;
  
    function TopbarController() {

      var vm = this;
      vm.toggleMenu = toggleMenu;

      function toggleMenu(event) {

        if(document.querySelector(".menu-user").style.display == 'none' || document.querySelector(".menu-user").style.display == '') {
          document.querySelector(".menu-user").style.display = 'block';
          document.querySelector(".menu-user").style.width = '250px';
          event.target.innerText = 'keyboard_arrow_up';
        }else {
          document.querySelector(".menu-user").style.width = 0;
          setTimeout(function() {
            document.querySelector(".menu-user").style.display = 'none';
          }, 500);
          event.target.innerText = 'keyboard_arrow_down';
        }
      }

    }
  }
})();
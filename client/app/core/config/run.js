(function() {
    'use strict';
    
    angular
        .module('odontoweb.core')
        .run(Run);

    Run.$inject = ['$rootScope', '$location', 'AutenticacaoService'];

    function Run($rootScope, $location, AutenticacaoService) {
        
        $rootScope.$on("$routeChangeStart", routeChangeStart);
        $rootScope.$on("logoutSuccess", logoutSuccess);
        $rootScope.isLoggedIn = isLoggedIn;
        $rootScope.go = go;
        $rootScope.toggleMenu = toggleMenu;
        $rootScope.logout = logout;
        $rootScope.changeTenant = changeTenant;
        $rootScope.isActive = isActive;

        function routeChangeStart(event, nextRoute, currentRoute) {
            if(!AutenticacaoService.isLogged()) {
                $location.path("/login");
            }
            else if(nextRoute.$$route.hasOwnProperty('requireAdmin') && !AutenticacaoService.getCurrentUser().admin) {
                $location.path("/negado");
            }
        }

        function isLoggedIn() {
            return AutenticacaoService.isLogged();
        }

        function logout() {
            if(AutenticacaoService.isLogged()) {
                AutenticacaoService.clearStorage();
                $rootScope.$broadcast("logoutSuccess");
            }
        }

        function logoutSuccess() {
            toastr.success('Volte sempre', 'Sessão finalizada!');
            toggleMenu();
            $location.path("/");
        }

        function changeTenant(id) {
            return AutenticacaoService.changeTenant(id).then(function(data) {
                AutenticacaoService.saveToken(data.token);
                AutenticacaoService.saveCurrentTenant(updateSelectedTenant());
                
                $rootScope.$broadcast("changedTenantSuccess");
                $location.path("/");
            });
        }

        function go(path) {
            $location.path(path);
        }

        function toggleMenu() {
            var menu = document.querySelector(".menu-user");
            var overlay = document.querySelector(".overlay-menu");
            
            overlay.classList.toggle('show');
            menu.classList.toggle('show');
        }

        function updateSelectedTenant() {
            var currentTenant = AutenticacaoService.getTenantFromToken();
            var tenants = AutenticacaoService.getCurrentUser().clinicas;
            return _.find(tenants, function(tenant) {return tenant.cnpj == currentTenant;});
        }

        function isActive(viewLocation) {
            var active = ($location.path().includes(viewLocation));
            return active;
        }

    }

})();
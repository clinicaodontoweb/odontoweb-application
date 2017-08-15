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

        function routeChangeStart(event, nextRoute, currentRoute) {
            if(nextRoute.$$route.hasOwnProperty('requireLogin') && !AutenticacaoService.isLogged()) {
                $location.path("/login");
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
            document.querySelector(".menu-user").classList.toggle('show');
        }

        function updateSelectedTenant() {
            var currentTenant = AutenticacaoService.getTenantFromToken();
            var tenants = AutenticacaoService.getCurrentUser().clinicas;
            return _.find(tenants, function(tenant) {return tenant.cnpj == currentTenant;});
        }

    }

})();
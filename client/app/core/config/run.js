(function() {
    'use strict';
    
    angular
        .module('OdontowebApp')
        .run(Run);

    Run.$inject = ['$rootScope', '$location', 'AutenticacaoService'];

    function Run($rootScope, $location, AutenticacaoService) {
        
        $rootScope.$on("$routeChangeStart", routeChangeStart);
        $rootScope.isLoggedIn = isLoggedIn;
        $rootScope.go = go;

        function routeChangeStart(event, nextRoute, currentRoute) {
            if(!nextRoute.$$route.hasOwnProperty('requireLogin') && !AutenticacaoService.isLogged()) {
                $location.path("/login");
            }
        }

        function isLoggedIn() {
            return AutenticacaoService.isLogged();
        }

        function go(path) {
            $location.path(path);
        }

    }

})();
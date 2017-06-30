(function() {
    'use strict';
    
    angular
        .module('OdontowebApp')
        .run(Run);

    Run.$inject = ['$rootScope', '$location', 'AuthorizationService'];

    function Run($rootScope, $location, AuthorizationService) {
        
        $rootScope.$on("$routeChangeStart", routeChangeStart);
        $rootScope.userName = userName;
        $rootScope.isLogged = isLogged;
        $rootScope.showElement = showElement;
        $rootScope.go = go;

        function routeChangeStart(event, nextRoute, currentRoute) {
            if(!nextRoute.$$route.hasOwnProperty('requireLogin') && !AuthorizationService.isLogged()) {
                $location.path("/login");
            }
        }

        function userName() { 
            return AuthorizationService.getUserName();
        }

        function isLogged() { 
            return AuthorizationService.isLogged();
        }

        function showElement() {
            return AuthorizationService.isLogged();
        }

        function go(path) {
            $location.path(path);
        }

    }

})();
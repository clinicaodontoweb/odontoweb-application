(function() {
    'use strict';

    angular
        .module('OdontowebApp')
        .factory('TokenInterceptor', TokenInterceptor);

    TokenInterceptor.$inject = ['$q', '$window'];

    function TokenInterceptor($q, $window) {
        return {
            request: request,
            response: response,
            requestError: requestError,
            responseError: responseError
        };

        function request(config) {
            config.headers = config.headers || {};

            if ($window.sessionStorage.token) {
                config.headers['X-Auth-Token'] = $window.sessionStorage.token;
            }

            return config;
        }

        function response(response) {
            return response || $q.when(response);
        }

        function requestError(rejection) {
            return $q.reject(rejection);
        }

        function responseError(rejection) {
            return $q.reject(rejection);
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('odontoweb.core')
        .factory('TokenInterceptor', TokenInterceptor);

    TokenInterceptor.$inject = ['$q', '$localStorage'];

    function TokenInterceptor($q, $localStorage) {
        return {
            request: request,
            response: response,
            requestError: requestError,
            responseError: responseError
        };

        function request(config) {
            config.headers = config.headers || {};

            if (!config.skipInterceptor && !config.url.includes("viacep") && $localStorage.token) {
                config.headers['X-Auth-Token'] = $localStorage.token;
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
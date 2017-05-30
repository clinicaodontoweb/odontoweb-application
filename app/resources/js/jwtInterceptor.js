app.factory('JWTInterceptor', ['$q', '$window', function ($q, $window) {
	 return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['X-Auth-Token'] = $window.sessionStorage.token;
            }
            return config;
        },
     
        response: function (response) {
            return response || $q.when(response);
        },

        requestError: function(rejection) {
            return $q.reject(rejection);
        },
 
        responseError: function(rejection) {
            return $q.reject(rejection);
        }
    };
}]);
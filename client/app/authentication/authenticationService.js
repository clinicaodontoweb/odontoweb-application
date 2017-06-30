app.factory('AuthenticationService', ['$resource', function($resource) {
	return $resource('/api/v1/auth', {}, {
        login: { 
        	method: 'POST' 
        }
    })
}]);
app.factory('AuthenticationService', ['$resource', function($resource) {
	return $resource('/login', {}, {
        login: { 
        	method: 'POST' 
        }
    })
}]);
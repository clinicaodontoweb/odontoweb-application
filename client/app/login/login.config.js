(function() {
    'use strict';
	
	angular
		.module('OdontowebApp')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {

		//routes
	 	$routeProvider
			.when('/login', {
                templateUrl: 'partials/login/login.view.html', 
                controller: 'LoginController', 
                controllerAs: 'vm'
            });
		
	}

})();
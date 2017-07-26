(function() {
    'use strict';
	
	angular
		.module('odontoweb.login')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {

	 	$routeProvider
			.when('/login', {
                templateUrl: 'partials/modulos/login/login.view.html', 
                controller: 'LoginController', 
                controllerAs: 'vm'
            });
		
	}

})();
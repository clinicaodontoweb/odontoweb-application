(function() {
    'use strict';
	
	angular
		.module('OdontowebApp')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {

		//routes
	 	$routeProvider
			.when('/cadastro/profissional', {
                templateUrl: 'partials/cadastro/profissional/profissional.novo.html',
                controller: 'ProfissionalController', 
                controllerAs: 'vm'
            });
			
	}

})();
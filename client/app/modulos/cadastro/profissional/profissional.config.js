(function() {
    'use strict';
	
	angular
		.module('odontoweb.cadastro')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {

		//routes
	 	$routeProvider
			.when('/cadastro/profissional', {
                templateUrl: 'partials/modulos/cadastro/profissional/profissional.novo.html',
                controller: 'ProfissionalController', 
                controllerAs: 'vm'
            });
			
	}

})();
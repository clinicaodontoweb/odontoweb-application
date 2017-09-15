(function() {
    'use strict';
	
	angular
		.module('odontoweb.cadastro')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {

		//routes
	 	$routeProvider
			.when('/cadastro/dentista', {
                templateUrl: 'partials/modulos/cadastro/dentista/dentista.novo.html',
                controller: 'DentistaController', 
				controllerAs: 'vm',
				requireAdmin: true
            });
			
	}

})();
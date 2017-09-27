(function() {
    'use strict';
	
	angular
		.module('odontoweb.cadastro')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {

		//routes
	 	$routeProvider
			.when('/cadastro/recepcionista', {
                templateUrl: 'partials/modulos/cadastro/recepcionista/recepcionista.novo.html',
                controller: 'RecepcionistaController', 
				controllerAs: 'vm',
				requireAdmin: true
			})
			.when('/cadastro/recepcionista/lista', {
                templateUrl: 'partials/modulos/cadastro/recepcionista/recepcionista.lista.html',
                controller: 'RecepcionistaController', 
				controllerAs: 'vm',
				requireAdmin: true
            });
			
	}

})();
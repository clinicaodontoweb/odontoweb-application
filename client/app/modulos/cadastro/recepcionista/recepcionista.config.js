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
                templateUrl: 'partials/modulos/cadastro/recepcionista/recepcionista-lista/recepcionista-lista.view.html',
                controller: 'RecepcionistaListaController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					recepcionistaListaData: recepcionistaListaData
				}
			})
			.when('/cadastro/recepcionista/novo', {
                templateUrl: 'partials/modulos/cadastro/recepcionista/recepcionista-novo/recepcionista-novo.view.html',
                controller: 'RecepcionistaNovoController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					recepcionistaNovoData: recepcionistaNovoData
				}
            });
			
	}

	function recepcionistaListaData(RecepcionistaService, AutenticacaoService) {
		return RecepcionistaService.getAllRecepcionistaByClinica(AutenticacaoService.getCurrentTenant().cnpj)
	}
	
	function recepcionistaNovoData(DentistaService) {
		return DentistaService.listaClinicasAndDentistas();
	}



})();
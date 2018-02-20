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
                templateUrl: 'partials/modulos/cadastro/dentista/dentista-lista/dentista-lista.view.html',
                controller: 'DentistaListaController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					dentistaListaData: dentistaListaData
				}
			})
			.when('/cadastro/dentista/novo', {
                templateUrl: 'partials/modulos/cadastro/dentista/dentista-novo/dentista-novo.view.html',
                controller: 'DentistaNovoController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					dentistaNovoData: dentistaNovoData
				}
			})
			.when('/cadastro/dentista/editar/:dentistaId', {
                templateUrl: 'partials/modulos/cadastro/dentista/dentista-editar/dentista-editar.view.html',
                controller: 'DentistaEditarController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					dentistaEditarData: dentistaEditarData
				}
            });
			
	}
	
	function dentistaListaData(DentistaService) {
		return DentistaService.listaClinicasAndDentistas()
	}

	function dentistaNovoData(DentistaService) {
		return DentistaService.listaClinicasAndDentistas();
	}

	function dentistaEditarData(DentistaService, $route) {
		return DentistaService.getDentista($route.current.params.dentistaId);
	}

})();
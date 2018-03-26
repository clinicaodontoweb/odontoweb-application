(function() {
    'use strict';
	
	angular
		.module('odontoweb.cadastro')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {

		//routes
	 	$routeProvider
			.when('/cadastro/status', {
                templateUrl: 'partials/modulos/cadastro/status-evento/status-evento-lista/status-evento-lista.view.html',
                controller: 'StatusEventoListaController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					statusListaData: statusListaData
				}
			})
			.when('/cadastro/status/novo', {
                templateUrl: 'partials/modulos/cadastro/status-evento/status-evento-novo/status-evento-novo.view.html',
                controller: 'StatusEventoNovoController', 
				controllerAs: 'vm',
				requireAdmin: true
			})
			.when('/cadastro/status/editar/:statusId', {
                templateUrl: 'partials/modulos/cadastro/status-evento/status-evento-editar/status-evento-editar.view.html',
                controller: 'StatusEventoEditarController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					statusEditarData: statusEditarData
				}
            });
			
	}

	function statusListaData(StatusEventoService) {
		return StatusEventoService.lista()
	}
	
	function statusEditarData(ApiService, entidades, $route) {
		return ApiService.listaTodasEntidades_id(entidades.status, $route.current.params.statusId);
	}

})();
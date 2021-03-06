(function() {
    'use strict';
	
	angular
		.module('odontoweb.cadastro')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {

		//routes
	 	$routeProvider
			.when('/cadastro/tipo-consulta', {
                templateUrl: 'partials/modulos/cadastro/tipo-consulta/tipo-consulta-lista/tipo-consulta-lista.view.html',
                controller: 'TipoConsultaListaController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					tipoConsultaListaData: tipoConsultaListaData
				}
			})
			.when('/cadastro/tipo-consulta/novo', {
                templateUrl: 'partials/modulos/cadastro/tipo-consulta/tipo-consulta-novo/tipo-consulta-novo.view.html',
                controller: 'TipoConsultaNovoController', 
				controllerAs: 'vm',
				requireAdmin: true
			})
			.when('/cadastro/tipo-consulta/editar/:tipoConsultaId', {
                templateUrl: 'partials/modulos/cadastro/tipo-consulta/tipo-consulta-editar/tipo-consulta-editar.view.html',
                controller: 'TipoConsultaEditarController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					tipoConsultaEditarData: tipoConsultaEditarData
				}
            });
			
	}

	function tipoConsultaListaData(TipoConsultaService) {
		return TipoConsultaService.lista()
	}

	function tipoConsultaEditarData(ApiService, entidades, $route) {
		return ApiService.listaTodasEntidades_id(entidades.tipoConsulta, $route.current.params.tipoConsultaId);
	}

})();
(function() {
    'use strict';
	
	angular
		.module('odontoweb.cadastro')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {

		//routes
	 	$routeProvider
			.when('/cadastro/convenio', {
                templateUrl: 'partials/modulos/cadastro/convenio/convenio-lista/convenio-lista.view.html',
                controller: 'ConvenioListaController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					convenioListaData: convenioListaData
				}
			})
			.when('/cadastro/convenio/novo', {
                templateUrl: 'partials/modulos/cadastro/convenio/convenio-novo/convenio-novo.view.html',
                controller: 'ConvenioNovoController', 
				controllerAs: 'vm',
				requireAdmin: true
			})
			.when('/cadastro/convenio/editar/:convenioId', {
                templateUrl: 'partials/modulos/cadastro/convenio/convenio-editar/convenio-editar.view.html',
                controller: 'ConvenioEditarController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					convenioEditarData: convenioEditarData
				}
            });
			
	}

	function convenioListaData(ConvenioService) {
		return ConvenioService.lista()
	}

	function convenioEditarData(ApiService, entidades, $route) {
		return ApiService.listaTodasEntidades_id(entidades.convenio, $route.current.params.convenioId);
	}

})();
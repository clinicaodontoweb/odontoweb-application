(function() {
    'use strict';
	
	angular
		.module('odontoweb.cadastro')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {

		//routes
	 	$routeProvider
			.when('/cadastro/indicacao', {
                templateUrl: 'partials/modulos/cadastro/indicacao/indicacao-lista/indicacao-lista.view.html',
                controller: 'IndicacaoListaController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					indicacaoListaData: indicacaoListaData
				}
			})
			.when('/cadastro/indicacao/novo', {
                templateUrl: 'partials/modulos/cadastro/indicacao/indicacao-novo/indicacao-novo.view.html',
                controller: 'IndicacaoNovoController', 
				controllerAs: 'vm',
				requireAdmin: true
			})
			.when('/cadastro/indicacao/editar/:indicacaoId', {
                templateUrl: 'partials/modulos/cadastro/indicacao/indicacao-editar/indicacao-editar.view.html',
                controller: 'IndicacaoEditarController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					indicacaoEditarData: indicacaoEditarData
				}
            });
			
	}

	function indicacaoListaData(IndicacaoService) {
		return IndicacaoService.lista()
	}

	function indicacaoEditarData(ApiService, entidades, $route) {
		return ApiService.listaTodasEntidades_id(entidades.indicacao, $route.current.params.indicacaoId);
	}

})();
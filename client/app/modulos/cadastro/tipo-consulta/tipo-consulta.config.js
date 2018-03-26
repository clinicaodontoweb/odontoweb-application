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
			.when('/cadastro/status/novo', {
                templateUrl: 'partials/modulos/cadastro/tipo-consulta/tipo-consulta-novo/tipo-consulta-novo.view.html',
                controller: 'TipoConsultaNovoController', 
				controllerAs: 'vm',
				requireAdmin: true
			})
			.when('/cadastro/status/editar/:statusId', {
                templateUrl: 'partials/modulos/cadastro/tipo-consulta/tipo-consulta-editar/tipo-consulta-editar.view.html',
                controller: 'TipoConsultaEditarController', 
				controllerAs: 'vm',
				requireAdmin: true
            });
			
	}

	function tipoConsultaListaData(TipoConsultaService) {
		return TipoConsultaService.lista()
	}

})();
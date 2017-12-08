(function() {
    'use strict';
	
	angular
		.module('odontoweb.cadastro')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {

		//routes
	 	$routeProvider
			.when('/cadastro/paciente', {
                templateUrl: 'partials/modulos/cadastro/paciente/paciente-lista/paciente-lista.view.html',
                controller: 'PacienteListaController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					pacienteListaData: pacienteListaData
				}
			})
			.when('/cadastro/paciente/novo', {
                templateUrl: 'partials/modulos/cadastro/paciente/paciente-novo/paciente-novo.view.html',
                controller: 'PacienteNovoController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					pacienteNovoData: pacienteNovoData
				}
            });
			
	}

	function pacienteListaData(ApiService, entidades) {
		return ApiService.listaTodasEntidades(entidades.paciente);
	}

	function pacienteNovoData(ApiService, entidades) {
		return ApiService.listaTodasEntidades(entidades.convenio);
	}

})();
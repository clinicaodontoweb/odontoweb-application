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
			})
			.when('/cadastro/paciente/editar/:pacienteId', {
                templateUrl: 'partials/modulos/cadastro/paciente/paciente-editar/paciente-editar.view.html',
                controller: 'PacienteEditarController',
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					pacienteEditarData: pacienteEditarData
				}
            });
			
	}

	function pacienteListaData(ApiService, entidades) {
		return ApiService.listaTodasEntidades(entidades.paciente);
	}

	function pacienteNovoData(ApiService, entidades, $q) {
		var redesSociais = ApiService.listaTodasEntidades(entidades.redeSocial);
		var indicacoes = ApiService.listaTodasEntidades(entidades.indicacao);

		return $q.all({ redesSociais: redesSociais, indicacoes: indicacoes });
	}

	function pacienteEditarData(ApiService, entidades, $route, $q) {
		var redesSociais = ApiService.listaTodasEntidades(entidades.redeSocial);
		var indicacoes = ApiService.listaTodasEntidades(entidades.indicacao);
		var paciente = ApiService.listaTodasEntidades_id(entidades.paciente, $route.current.params.pacienteId);

		return $q.all({ redesSociais: redesSociais, indicacoes: indicacoes, paciente: paciente });
	}

})();
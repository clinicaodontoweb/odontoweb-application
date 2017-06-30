(function() {
    'use strict';
	
	angular
		.module('OdontowebApp')
		.config(config);

	config.$inject = ['$routeProvider', '$httpProvider', 'RestangularProvider'];

	function config($routeProvider, $httpProvider, RestangularProvider) {

		//base url api
		RestangularProvider.setBaseUrl('/api/v1');

		//token interceptor
		$httpProvider.interceptors.push('TokenInterceptor');

		//routes
	 	$routeProvider
			.when('/', {redirectTo: '/agenda'})
			.when('/agenda', {templateUrl: 'partials/agenda/agenda.view.html', controller: 'AgendaController', controllerAs: 'vm'})
			.when('/cadastros', {templateUrl: 'partials/cadastros/index.html', controller: 'CadastrosController', controllerAs: 'vm'})
			.when('/login', {templateUrl: 'partials/authentication/login.html', controller: 'AuthenticationController', controllerAs: 'vm'})
			.when('/cadastros/bairro', {templateUrl: 'partials/cadastros/bairro/list.html', controller: 'ListarBairroController', controllerAs: 'vm'})
			.when('/cadastros/bairro/novo', {templateUrl: 'partials/cadastros/bairro/new.html', controller: 'CadastrarBairroController', controllerAs: 'vm'})
			.when('/cadastros/bairro/editar/:id', {templateUrl: 'partials/cadastros/bairro/edit.html', controller: 'EditarBairroController', controllerAs: 'vm'})
			.when('/cadastros/cep', {templateUrl: 'partials/cadastros/cep/list.html', controller: 'ListarCepController', controllerAs: 'vm'})
			.when('/cadastros/cep/novo', {templateUrl: 'partials/cadastros/cep/new.html', controller: 'CadastrarCepController', controllerAs: 'vm'})
			.when('/cadastros/cep/editar/:id', {templateUrl: 'cpartials/adastros/cep/edit.html', controller: 'EditarCepController', controllerAs: 'vm'})
			.when('/cadastros/sigla', {templateUrl: 'partials/cadastros/sigla/list.html', controller: 'ListarSiglaController', controllerAs: 'vm'})
			.when('/cadastros/sigla/novo', {templateUrl: 'partials/cadastros/sigla/new.html', controller: 'CadastrarSiglaController', controllerAs: 'vm'})
			.when('/cadastros/sigla/editar/:id', {templateUrl: 'partials/cadastros/sigla/edit.html', controller: 'EditarSiglaController', controllerAs: 'vm'})
			.when('/cadastros/estado', {templateUrl: 'partials/cadastros/estado/list.html', controller: 'ListarEstadoController', controllerAs: 'vm'})
			.when('/cadastros/estado/novo', {templateUrl: 'partials/cadastros/estado/new.html', controller: 'CadastrarEstadoController', controllerAs: 'vm'})
			.when('/cadastros/estado/editar/:id', {templateUrl: 'partials/cadastros/estado/edit.html', controller: 'EditarEstadoController', controllerAs: 'vm'})
			.when('/cadastros/cidade', {templateUrl: 'partials/cadastros/cidade/list.html', controller: 'ListarCidadeController', controllerAs: 'vm'})
			.when('/cadastros/cidade/novo', {templateUrl: 'partials/cadastros/cidade/new.html', controller: 'CadastrarCidadeController', controllerAs: 'vm'})
			.when('/cadastros/cidade/editar/:id', {templateUrl: 'partials/cadastros/cidade/edit.html', controller: 'EditarCidadeController', controllerAs: 'vm'})
			.when('/cadastros/consulta/tipo', {templateUrl: 'partials/cadastros/consulta/tipo/list.html', controller: 'ListarConsultaTipoController', controllerAs: 'vm'})
			.when('/cadastros/consulta/tipo/novo', {templateUrl: 'partials/cadastros/consulta/tipo/new.html', controller: 'CadastrarConsultaTipoController', controllerAs: 'vm'})
			.when('/cadastros/consulta/tipo/editar/:id', {templateUrl: 'partials/cadastros/consulta/tipo/edit.html', controller: 'EditarConsultaTipoController', controllerAs: 'vm'})
			.otherwise({templateUrl: '404.html'});
		
	}

})();
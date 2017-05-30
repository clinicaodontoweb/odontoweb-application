app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider)
{
	$routeProvider
		.when('/', {templateUrl: 'partials/agenda/index.html', controller: 'AgendaController'})
		.when('/pacientes', {templateUrl: 'partials/pacientes/index.html', controller: 'PacientesController'})
		.when('/cadastros', {templateUrl: 'partials/cadastros/index.html', controller: 'CadastrosController'})
		.when('/configuracoes', {templateUrl: 'partials/configuracoes/index.html', controller: 'ConfiguracoesController'})
		.when('/login', {templateUrl: 'partials/authentication/login.html', controller: 'AuthenticationController'})
		.when('/cadastros/bairro', {templateUrl: 'partials/cadastros/bairro/list.html', controller: 'ListarBairroController'})
		.when('/cadastros/bairro/novo', {templateUrl: 'partials/cadastros/bairro/new.html', controller: 'CadastrarBairroController'})
		.when('/cadastros/bairro/editar/:id', {templateUrl: 'partials/cadastros/bairro/edit.html', controller: 'EditarBairroController'})
		.when('/cadastros/cep', {templateUrl: 'partials/cadastros/cep/list.html', controller: 'ListarCepController'})
		.when('/cadastros/cep/novo', {templateUrl: 'partials/cadastros/cep/new.html', controller: 'CadastrarCepController'})
		.when('/cadastros/cep/editar/:id', {templateUrl: 'partials/cadastros/cep/edit.html', controller: 'EditarCepController'})
		.when('/cadastros/sigla', {templateUrl: 'partials/cadastros/sigla/list.html', controller: 'ListarSiglaController'})
		.when('/cadastros/sigla/novo', {templateUrl: 'partials/cadastros/sigla/new.html', controller: 'CadastrarSiglaController'})
		.when('/cadastros/sigla/editar/:id', {templateUrl: 'partials/cadastros/sigla/edit.html', controller: 'EditarSiglaController'})
		.when('/cadastros/estado', {templateUrl: 'partials/cadastros/estado/list.html', controller: 'ListarEstadoController'})
		.when('/cadastros/estado/novo', {templateUrl: 'partials/cadastros/estado/new.html', controller: 'CadastrarEstadoController'})
		.when('/cadastros/estado/editar/:id', {templateUrl: 'partials/cadastros/estado/edit.html', controller: 'EditarEstadoController'})
		.when('/cadastros/cidade', {templateUrl: 'partials/cadastros/cidade/list.html', controller: 'ListarCidadeController'})
		.when('/cadastros/cidade/novo', {templateUrl: 'partials/cadastros/cidade/new.html', controller: 'CadastrarCidadeController'})
		.when('/cadastros/cidade/editar/:id', {templateUrl: 'partials/cadastros/cidade/edit.html', controller: 'EditarCidadeController'})
		.when('/cadastros/consulta/tipo', {templateUrl: 'partials/cadastros/consulta/tipo/list.html', controller: 'ListarConsultaTipoController'})
		.when('/cadastros/consulta/tipo/novo', {templateUrl: 'partials/cadastros/consulta/tipo/new.html', controller: 'CadastrarConsultaTipoController'})
		.when('/cadastros/consulta/tipo/editar/:id', {templateUrl: 'partials/cadastros/consulta/tipo/edit.html', controller: 'EditarConsultaTipoController'})
		.otherwise({templateUrl: 'partials/no_page.html'});

	$httpProvider.interceptors.push('JWTInterceptor');
	
}]);
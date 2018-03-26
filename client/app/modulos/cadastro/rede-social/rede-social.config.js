(function() {
    'use strict';
	
	angular
		.module('odontoweb.cadastro')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {

		//routes
	 	$routeProvider
			.when('/cadastro/rede-social', {
                templateUrl: 'partials/modulos/cadastro/rede-social/rede-social-lista/rede-social-lista.view.html',
                controller: 'RedeSocialListaController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					redeSocialListaData: redeSocialListaData
				}
			})
			.when('/cadastro/rede-social/novo', {
                templateUrl: 'partials/modulos/cadastro/rede-social/rede-social-novo/rede-social-novo.view.html',
                controller: 'RedeSocialNovoController', 
				controllerAs: 'vm',
				requireAdmin: true
			})
			.when('/cadastro/rede-social/editar/:redeSocialId', {
                templateUrl: 'partials/modulos/cadastro/rede-social/rede-social-editar/rede-social-editar.view.html',
                controller: 'RedeSocialEditarController', 
				controllerAs: 'vm',
				requireAdmin: true,
				resolve: {
					redeSocialEditarData: redeSocialEditarData
				}
            });
			
	}

	function redeSocialListaData(RedeSocialService) {
		return RedeSocialService.lista()
	}

	function redeSocialEditarData(ApiService, entidades, $route) {
		return ApiService.listaTodasEntidades_id(entidades.redeSocial, $route.current.params.redeSocialId);
	}

})();
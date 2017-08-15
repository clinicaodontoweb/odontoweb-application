(function() {
    'use strict';

    angular
        .module('odontoweb.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AutenticacaoService', '$location', '$rootScope'];

    function LoginController(AutenticacaoService, $location, $rootScope) {
		var vm = this;
		vm.user = {}
		vm.erro = false;
		vm.login = login;

        function login() {
			autenticar()
				.then(getProfile)
				.then(redirect);
		}

		function autenticar() {
			return AutenticacaoService
						.login(vm.user)
						.then(function(data) {
							AutenticacaoService.saveToken(data.token);
							return data.token;
						});
		}
			
		function getProfile() {
			return AutenticacaoService.me().then(function(usuario) {
				AutenticacaoService.saveCurrentUser(usuario);
				AutenticacaoService.saveCurrentTenant(getSelectedTenant(usuario.clinicas));
				
				return usuario;
			});
		}

		function getSelectedTenant(tenants) {
			if(tenants) {
				var tenantFromToken = AutenticacaoService.getTenantFromToken();
				return _.find(tenants, function(tenant) {return tenant.cnpj == tenantFromToken;});
			}

			return null;
		}

		function redirect() {
			$rootScope.$broadcast("loginSuccess");
			$location.path("/");
		}
    }
})();
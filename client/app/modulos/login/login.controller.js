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

        function login(isValid) {
			if (isValid) {
				autenticar()
					.then(getProfile)
					.then(redirect, loginError);
			}
		}

		function autenticar() {
			return AutenticacaoService
						.login(vm.user)
						.then(function(data) {
							AutenticacaoService.saveToken(data.token);
							return data.token;
						});
		}
					
		function loginError(error) {
			toastr.error(error.data.mensagem, 'Login falhou!');
		}
			
		function getProfile() {
			console.log("ffd")
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

		function redirect(usuario) {
			toastr.success(usuario.email, 'Bem vindo!');
			$rootScope.$broadcast("loginSuccess");
			$location.path("/");
		}
    }
})();
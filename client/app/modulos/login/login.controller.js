(function() {
    'use strict';

    angular
        .module('odontoweb.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AutenticacaoService', '$location'];

    function LoginController(AutenticacaoService, $location) {
        var vm = this;
        vm.title = 'Acesso ao Sistema';
        vm.subTitle	= "Preencha os dados de seu login para acessar o sistema.";
		vm.user = {};
		vm.erro = false;
		vm.login = login;

        function login() {
			if(validateLoginForm()) {
				AutenticacaoService.login(vm.user).then(function(data) {
					AutenticacaoService.saveToken(data.token);
					$location.path("/");
				},function(status, data) {
					vm.erro = true;
				});
			}
	    }

	    function validateLoginForm() {
    		return vm.user.email !== undefined && vm.user.senha !== undefined;
	    }
    }
})();
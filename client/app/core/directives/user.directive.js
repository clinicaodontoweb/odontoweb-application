(function() {
    'use strict';

    angular
        .module('OdontowebApp')
        .directive('owUser', user);

    function user() {
        var directive = {
            bindToController: true,
            controller: UserController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'partials/core/directives/user.directive.html',
            scope: true
        };

        return directive;
    }

    UserController.$inject = ['AutenticacaoService', '$location'];

    function UserController(AutenticacaoService, $location) {
    	var vm = this;
    	vm.user = {};
    	vm.logout = logout;

    	activate();

    	function activate() {
            if(AutenticacaoService.isLogged()){
        		return AutenticacaoService.me().then(function(usuario) {
        			vm.user = usuario;
        			return vm.user;
        		});
            }
    	}

    	function logout() {
			if(AutenticacaoService.isLogged()) {
	            AutenticacaoService.deleteToken();
	            $location.path("/login");
			}
	    }

    }

})();
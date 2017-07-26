(function() {
    'use strict';

    angular
        .module('odontoweb.core')
        .directive('owTenantSelect', tenantSelect);

    function tenantSelect() {
        var directive = {
            bindToController: true,
            controller: TenantSelectController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'partials/core/directives/tenant.directive.html',
            scope: true
        };

        return directive;
    }
    
    TenantSelectController.$inject = ['AutenticacaoService', '$location'];

    function TenantSelectController(AutenticacaoService, $location) {

		var vm = this;
		vm.tenants = {};
		vm.tenantSelected = {};
		vm.changeTenant = changeTenant;

		activate();

		function activate() {
			getTenants();
		}

    	function getTenants(){
			if(AutenticacaoService.isLogged()){
				return AutenticacaoService.me().then(function(usuario) {
				  vm.tenants = usuario.clinicas;
				  vm.tenantSelected = getSelectedTenant(usuario.clinicas);

				  return vm.usuario;
				});
			}
		}

		function getSelectedTenant(tenants) {
			if(tenants) {
				var tenantFromToken = AutenticacaoService.getTenantFromToken();
				return _.find(tenants, function(tenant) {return tenant.cnpj == tenantFromToken;});
			}

			return null;
		}

		function changeTenant() {
			var id = vm.tenantSelected.id;
			return AutenticacaoService.changeTenant(id).then(function(data) {
				AutenticacaoService.updateToken(data.token);
				$location.path("/");
			});
		}
	}

})();
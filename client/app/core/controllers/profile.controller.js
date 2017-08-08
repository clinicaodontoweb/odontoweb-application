(function() {
  'use strict';

  angular
    .module('odontoweb.core')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['AutenticacaoService', '$location', '$rootScope'];

  function ProfileController(AutenticacaoService, $location, $rootScope) {
    var vm = this;
    vm.tenants = {};
    vm.tenantSelected = {};
    vm.changeTenant = changeTenant;
    vm.user = {};
    vm.logout = logout;

    activate();

    function activate() {
        getProfile();
    }

    $rootScope.$on('login', function() {
        activate();
    });

    function getProfile(){
        if(AutenticacaoService.isLogged()){
            return AutenticacaoService.me().then(function(usuario) {
                vm.tenants = usuario.clinicas;
                vm.user = usuario;
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

    function updateSelectedTenant() {
        var tenantFromToken = AutenticacaoService.getTenantFromToken();
        return _.find(vm.tenants, function(tenant) {return tenant.cnpj == tenantFromToken;});
    }

    function changeTenant(id) {
        return AutenticacaoService.changeTenant(id).then(function(data) {
            AutenticacaoService.updateToken(data.token);
            vm.tenantSelected = updateSelectedTenant();
            $rootScope.$broadcast("changeTenant");
            $location.path("/");
        });
    }

    function logout() {
        if(AutenticacaoService.isLogged()) {
            AutenticacaoService.deleteToken();
            $rootScope.$broadcast("logout");
            $location.path("/login");
        }
    }

  }

})();
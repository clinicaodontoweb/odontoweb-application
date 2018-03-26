(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('TipoConsultaEditarController', TipoConsultaEditarController);

    TipoConsultaEditarController.$inject = ['tipoConsultaEditarData', 'TipoConsultaService', 'entidades', '$uibModal', '$scope', '$location'];

    function TipoConsultaEditarController(tipoConsultaEditarData, TipoConsultaService, entidades, $uibModal, $scope, $location) {
        var vm = this;
        vm.cadastrar = cadastrar;
        vm.request = tipoConsultaEditarData;

        function cadastrar(isValid) {
            if(isValid) {
                vm.request.put().then(function(response) {
                    $scope.cadastroForm.$setUntouched();
                    $scope.cadastroForm.$setPristine();
                    $location.path("/cadastro/tipo-consulta");
                }, function(response) {
                    toastr.error('Erro ao atualizar cadastro!');
                });
            }
        }

    }
})();

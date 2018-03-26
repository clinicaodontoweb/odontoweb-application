(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('StatusEventoEditarController', StatusEventoEditarController);

    StatusEventoEditarController.$inject = ['statusEditarData', 'StatusEventoService', 'entidades', '$uibModal', '$scope', '$location'];

    function StatusEventoEditarController(statusEditarData, StatusEventoService, entidades, $uibModal, $scope, $location) {
        var vm = this;
        vm.cadastrar = cadastrar;
        vm.request = statusEditarData;

        function cadastrar(isValid) {
            if(isValid) {
                vm.request.put().then(function(response) {
                    $scope.cadastroForm.$setUntouched();
                    $scope.cadastroForm.$setPristine();
                    $location.path("/cadastro/status");
                }, function(response) {
                    toastr.error('Erro ao atualizar cadastro!');
                });
            }
        }
    }
})();

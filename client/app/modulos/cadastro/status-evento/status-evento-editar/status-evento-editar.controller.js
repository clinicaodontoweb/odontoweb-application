(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('StatusEventoEditarController', StatusEventoEditarController);

    StatusEventoEditarController.$inject = ['StatusEventoService', 'entidades', '$uibModal', '$scope', '$location'];

    function StatusEventoEditarController(StatusEventoService, entidades, $uibModal, $scope, $location) {
        var vm = this;
        vm.cadastrar = cadastrar;
        vm.request = {};

        function cadastrar(isValid) {
            if(isValid) {
                vm.request = buildRequestModel();
                StatusEventoService.salvar(vm.request)
                    .then(function(dados) {
                        toastr.success('Cadastrado com sucesso!');
                        $location.path("/cadastro/status");
                    },function(error) {
                        toastr.error(error.data.mensagem, 'Erro ao cadastrar!');
                    });
            }
        }

        function buildRequestModel() {
            return {
                idStatus: null,
                nome: vm.request.nome,
                cor: vm.request.cor
            }
        }

    }
})();

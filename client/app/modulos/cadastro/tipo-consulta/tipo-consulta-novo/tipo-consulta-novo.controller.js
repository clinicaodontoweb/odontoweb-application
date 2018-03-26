(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('TipoConsultaNovoController', TipoConsultaNovoController);

    TipoConsultaNovoController.$inject = ['TipoConsultaService', 'entidades', '$uibModal', '$scope', '$location'];

    function TipoConsultaNovoController(TipoConsultaService, entidades, $uibModal, $scope, $location) {
        var vm = this;
        vm.cadastrar = cadastrar;
        vm.request = {};

        function cadastrar(isValid) {
            if(isValid) {
                vm.request = buildRequestModel();
                TipoConsultaService.salvar(vm.request)
                    .then(function(dados) {
                        toastr.success('Cadastrado com sucesso!');
                        $location.path("/cadastro/tipo-consulta");
                    },function(error) {
                        toastr.error(error.data.mensagem, 'Erro ao cadastrar!');
                    });
            }
        }

        function buildRequestModel() {
            return {
                idTipoConsulta: null,
                nome: vm.request.nome,
                corPrimaria: vm.request.corPrimaria,
                corSecundaria: vm.request.corSecundaria
            }
        }

    }
})();

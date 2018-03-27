(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('IndicacaoNovoController', IndicacaoNovoController);

    IndicacaoNovoController.$inject = ['IndicacaoService', 'entidades', '$uibModal', '$scope', '$location'];

    function IndicacaoNovoController(IndicacaoService, entidades, $uibModal, $scope, $location) {
        var vm = this;
        vm.cadastrar = cadastrar;
        vm.request = {};

        function cadastrar(isValid) {
            if(isValid) {
                vm.request = buildRequestModel();
                IndicacaoService.salvar(vm.request)
                    .then(function(dados) {
                        toastr.success('Cadastrado com sucesso!');
                        $location.path("/cadastro/indicacao");
                    },function(error) {
                        toastr.error(error.data.mensagem, 'Erro ao cadastrar!');
                    });
            }
        }

        function buildRequestModel() {
            return {
                idRedeSocial: null,
                nome: vm.request.nome
            }
        }

    }
})();

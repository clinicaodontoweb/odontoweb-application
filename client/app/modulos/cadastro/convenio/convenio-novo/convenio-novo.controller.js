(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('ConvenioNovoController', ConvenioNovoController);

    ConvenioNovoController.$inject = ['CrudService', 'ConvenioService', 'entidades', '$uibModal', '$scope', '$location'];

    function ConvenioNovoController(CrudService, ConvenioService, entidades, $uibModal, $scope, $location) {
        var vm = this;
        vm.cadastrar = cadastrar;
        vm.request = {};
        vm.adicionarTelefone = adicionarTelefone;
        vm.removerTelefone = removerTelefone;
        
        activate();

        function activate() {
            vm.request = CrudService.buildRequest();
        }

        function cadastrar(isValid) {
            if(isValid) {
                ConvenioService.salvar(vm.request)
                    .then(function(dados) {
                        toastr.success('Cadastrado com sucesso!');
                        $location.path("/cadastro/convenio");
                    },function(error) {
                        toastr.error(error.data.mensagem, 'Erro ao cadastrar!');
                    });
            }
        }

        function adicionarTelefone() {
            vm.request.contato.telefones.push(vm.telefone);
            vm.telefone = {};
        }

        function removerTelefone(index) {
            vm.request.contato.telefones.splice(index, 1);
        }
    }
})();

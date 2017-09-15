(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('DentistaController', DentistaController);

    DentistaController.$inject = ['DentistaService', 'entidades', '$uibModal'];

    function DentistaController(DentistaService, entidades, $uibModal) {
        var vm = this;
        vm.cadastrar = cadastrar;
        vm.dentista = {};
        vm.request = {};
        vm.clinicas = []

        activate();

        function activate() {
            getClinicasAndDentistas();
        }

        function getClinicasAndDentistas() {
            return DentistaService
                .listaClinicasAndDentistas()
                .then(function(dados) {
                    vm.clinicas = dados.clinicas;
                    return dados;
                });
        }
      
        function cadastrar(isValid) {
            if(isValid) {
                vm.request = buildRequestModel();
                DentistaService.salvar(vm.request)
                    .then(function(dados) {
                        toastr.success(request.nome, 'Cadastrado com sucesso!');
                        vm.dentista = {};
                    },function(error) {
                        toastr.error(error.data.mensagem, 'Erro ao cadastrar!');
                    });
            }
        }

        function buildRequestModel() {
            return {
                nome: vm.dentista.nome,
                genero: vm.dentista.genero,
                conselho: vm.dentista.conselho,
                registro: vm.dentista.registro,
                codigoBrasileiroOcupacao: vm.dentista.codigoOcupacao,
                usuarioRequest: {
                    email: vm.dentista.email,
                    senha: vm.dentista.senha,
                    admin: vm.dentista.isAdmin,
                    clinicas: vm.dentista.clinicas
                }
            }
        }


    }
})();

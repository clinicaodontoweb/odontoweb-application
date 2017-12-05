(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('DentistaNovoController', DentistaNovoController);

    DentistaNovoController.$inject = ['DentistaService', 'entidades', '$uibModal', '$scope', '$location'];

    function DentistaNovoController(DentistaService, entidades, $uibModal, $scope, $location) {
        var vm = this;
        vm.toggle = toggle;
        vm.cadastrar = cadastrar;
        vm.dentista = {
            clinicas: []
        };
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
                        toastr.success(vm.request.nome, 'Cadastrado com sucesso!');
                        vm.dentista = {};
                        $scope.dentistaForm.$setUntouched();
                        $scope.dentistaForm.$setPristine();
                        $location.path("/cadastro/dentista");
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
                    admin: (vm.dentista.isAdmin) ? vm.dentista.isAdmin : false,
                    clinicas: vm.dentista.clinicas
                }
            }
        }

        function toggle(item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
              list.splice(idx, 1);
            }
            else {
              list.push(item);
            }
        };

    }
})();

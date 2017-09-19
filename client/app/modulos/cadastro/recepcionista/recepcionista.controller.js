(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('RecepcionistaController', RecepcionistaController);

    RecepcionistaController.$inject = ['DentistaService', 'RecepcionistaService', 'entidades', '$uibModal', '$scope'];

    function RecepcionistaController(DentistaService, RecepcionistaService, entidades, $uibModal, $scope) {
        var vm = this;
        vm.toggle = toggle;
        vm.cadastrar = cadastrar;
        vm.recepcionista = {
            clinicas: [],
            dentistas: []
        };
        vm.request = {};
        vm.clinicas = [];
        vm.dentistas = [];

        activate();

        function activate() {
            getClinicasAndDentistas();
        }

        function getClinicasAndDentistas() {
            return DentistaService
                .listaClinicasAndDentistas()
                .then(function(dados) {
                    vm.clinicas = dados.clinicas;
                    vm.dentistas = dados.dentistas;
                    return dados;
                });
        }
      
        function cadastrar(isValid) {
            if(isValid) {
                vm.request = buildRequestModel();
                RecepcionistaService.salvar(vm.request)
                    .then(function(dados) {
                        toastr.success(vm.request.nome, 'Cadastrado com sucesso!');
                        vm.recepcionista = {
                            clinicas: [],
                            dentistas: []
                        };
                        $scope.recepcionistaForm.$setUntouched();
                        $scope.recepcionistaForm.$setPristine();
                    },function(error) {
                        toastr.error(error.data.mensagem, 'Erro ao cadastrar!');
                    });
            }
        }

        function buildRequestModel() {
            return {
                nome: vm.recepcionista.nome,
                genero: vm.recepcionista.genero,
                dentistas: vm.recepcionista.dentistas,
                usuarioRequest: {
                    email: vm.recepcionista.email,
                    senha: vm.recepcionista.senha,
                    admin: (vm.recepcionista.isAdmin) ? vm.recepcionista.isAdmin : false,
                    clinicas: vm.recepcionista.clinicas
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

(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('RecepcionistaNovoController', RecepcionistaNovoController);

    RecepcionistaNovoController.$inject = ['recepcionistaNovoData', 'RecepcionistaService', '$scope', '$location', '$localStorage'];

    function RecepcionistaNovoController(recepcionistaNovoData, RecepcionistaService, $scope, $location, $localStorage) {
        var vm = this;
        vm.toggle = toggle;
        vm.cadastrar = cadastrar;
        vm.recepcionista = {
            clinicas: [],
            dentistas: []
        };
        vm.request = {};
        vm.clinicas = recepcionistaNovoData.clinicas;
        vm.dentistas = recepcionistaNovoData.dentistas;
        vm.$storage = $localStorage;

        activate();

        function activate() {
            vm.clinicas.forEach(function(clinica) {
                if(vm.$storage.currentTenant.cnpj == clinica.cnpj){
                    vm.recepcionista.clinicas.push(clinica);
                }
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
                        $location.path("/cadastro/recepcionista");
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
                usuario: {
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

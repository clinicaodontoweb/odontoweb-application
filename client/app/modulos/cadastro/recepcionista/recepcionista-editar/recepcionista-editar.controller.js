(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('RecepcionistaEditarController', RecepcionistaEditarController);

    RecepcionistaEditarController.$inject = ['DentistaService', 'recepcionistaEditarData', 'RecepcionistaService', '$scope', '$location', '$localStorage'];

    function RecepcionistaEditarController(DentistaService, recepcionistaEditarData, RecepcionistaService, $scope, $location, $localStorage) {
        var vm = this;
        vm.cadastrar = cadastrar;
        vm.recepcionista = recepcionistaEditarData;
        vm.$storage = $localStorage;

        activate();

        function activate() {
            DentistaService.listaClinicasAndDentistas().then(function(response) {
                vm.clinicas = response.clinicas;
                vm.dentistas = response.dentistas;
            });
        }

        function cadastrar(isValid) {
            if(isValid) {
                delete vm.recepcionista.usuario.hashKey;
                delete vm.recepcionista.usuario.roles;

                vm.recepcionista.put().then(function(response) {
                    $scope.recepcionistaForm.$setUntouched();
                    $scope.recepcionistaForm.$setPristine();
                    $location.path("/cadastro/recepcionista");
                }, function(response) {
                    toastr.error('Erro ao atualizar cadastro!');
                });
            }
        }

    }
})();

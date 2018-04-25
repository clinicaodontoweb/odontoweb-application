(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('RecepcionistaEditarController', RecepcionistaEditarController);

    RecepcionistaEditarController.$inject = ['DentistaService', 'recepcionistaEditarData', 'RecepcionistaService', '$scope', '$location'];

    function RecepcionistaEditarController(DentistaService, recepcionistaEditarData, RecepcionistaService, $scope, $location) {
        var vm = this;
        vm.toggle = toggle;
        vm.cadastrar = cadastrar;
        vm.recepcionista = recepcionistaEditarData;

        activate();

        function activate() {
            DentistaService.listaClinicasAndDentistas().then(function(response) {
                vm.clinicas = response.clinicas;
                vm.dentistas = response.dentistas;
            });
        }

        function cadastrar(isValid) {
            if(isValid) {
                vm.recepcionista.put().then(function(response) {
                    $scope.recepcionistaForm.$setUntouched();
                    $scope.recepcionistaForm.$setPristine();
                    $location.path("/cadastro/recepcionista");
                }, function(response) {
                    toastr.error('Erro ao atualizar cadastro!');
                });
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

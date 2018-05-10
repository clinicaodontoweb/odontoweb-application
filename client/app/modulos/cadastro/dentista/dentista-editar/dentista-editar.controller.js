(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('DentistaEditarController', DentistaEditarController);

    DentistaEditarController.$inject = ['dentistaEditarData', 'DentistaService', 'entidades', '$uibModal', '$scope', '$location', '$localStorage'];

    function DentistaEditarController(dentistaEditarData, DentistaService, entidades, $uibModal, $scope, $location, $localStorage) {
        var vm = this;
        vm.toggle = toggle;
        vm.cadastrar = cadastrar;
        vm.dentista = dentistaEditarData;
        vm.clinicas = [];
        vm.$storage = $localStorage;

        activate();

        function activate() {
            DentistaService.listaClinicasAndDentistas().then(function(response) {
                vm.clinicas = response.clinicas;
            });
        }

        function cadastrar(isValid) {
            if(isValid) {
                vm.dentista.put().then(function(response) {
                    $scope.dentistaForm.$setUntouched();
                    $scope.dentistaForm.$setPristine();
                    $location.path("/cadastro/dentista");
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

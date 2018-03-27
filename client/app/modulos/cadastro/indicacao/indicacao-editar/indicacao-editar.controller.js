(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('IndicacaoEditarController', IndicacaoEditarController);

    IndicacaoEditarController.$inject = ['indicacaoEditarData', 'entidades', '$uibModal', '$scope', '$location'];

    function IndicacaoEditarController(indicacaoEditarData, entidades, $uibModal, $scope, $location) {
        var vm = this;
        vm.cadastrar = cadastrar;
        vm.request = indicacaoEditarData;

        function cadastrar(isValid) {
            if(isValid) {
                vm.request.put().then(function(response) {
                    $scope.cadastroForm.$setUntouched();
                    $scope.cadastroForm.$setPristine();
                    $location.path("/cadastro/indicacao");
                }, function(response) {
                    toastr.error('Erro ao atualizar cadastro!');
                });
            }
        }

    }
})();

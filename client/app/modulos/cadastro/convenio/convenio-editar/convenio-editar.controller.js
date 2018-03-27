(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('ConvenioEditarController', ConvenioEditarController);

    ConvenioEditarController.$inject = ['convenioEditarData', 'entidades', '$uibModal', '$scope', '$location'];

    function ConvenioEditarController(convenioEditarData, entidades, $uibModal, $scope, $location) {
        var vm = this;
        vm.cadastrar = cadastrar;
        vm.request = convenioEditarData;

        function cadastrar(isValid) {
            if(isValid) {
                vm.request.put().then(function(response) {
                    $scope.cadastroForm.$setUntouched();
                    $scope.cadastroForm.$setPristine();
                    $location.path("/cadastro/convenio");
                }, function(response) {
                    toastr.error('Erro ao atualizar cadastro!');
                });
            }
        }

    }
})();

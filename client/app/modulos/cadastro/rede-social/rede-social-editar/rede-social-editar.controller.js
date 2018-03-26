(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('RedeSocialEditarController', RedeSocialEditarController);

    RedeSocialEditarController.$inject = ['redeSocialEditarData', 'RedeSocialService', 'entidades', '$uibModal', '$scope', '$location'];

    function RedeSocialEditarController(redeSocialEditarData, RedeSocialService, entidades, $uibModal, $scope, $location) {
        var vm = this;
        vm.cadastrar = cadastrar;
        vm.request = redeSocialEditarData;

        function cadastrar(isValid) {
            if(isValid) {
                vm.request.put().then(function(response) {
                    $scope.cadastroForm.$setUntouched();
                    $scope.cadastroForm.$setPristine();
                    $location.path("/cadastro/rede-social");
                }, function(response) {
                    toastr.error('Erro ao atualizar cadastro!');
                });
            }
        }

    }
})();

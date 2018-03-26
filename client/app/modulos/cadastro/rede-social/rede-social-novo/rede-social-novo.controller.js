(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('RedeSocialNovoController', RedeSocialNovoController);

    RedeSocialNovoController.$inject = ['RedeSocialService', 'entidades', '$uibModal', '$scope', '$location'];

    function RedeSocialNovoController(RedeSocialService, entidades, $uibModal, $scope, $location) {
        var vm = this;
        vm.cadastrar = cadastrar;
        vm.request = {};

        function cadastrar(isValid) {
            if(isValid) {
                vm.request = buildRequestModel();
                RedeSocialService.salvar(vm.request)
                    .then(function(dados) {
                        toastr.success('Cadastrado com sucesso!');
                        $location.path("/cadastro/rede-social");
                    },function(error) {
                        toastr.error(error.data.mensagem, 'Erro ao cadastrar!');
                    });
            }
        }

        function buildRequestModel() {
            return {
                idRedeSocial: null,
                nome: vm.request.nome
            }
        }

    }
})();

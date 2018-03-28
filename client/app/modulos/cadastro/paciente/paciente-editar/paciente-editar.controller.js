(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('PacienteEditarController', PacienteEditarController);

    PacienteEditarController.$inject = ['pacienteEditarData', 'entidades', 'PacienteService', '$scope', '$location'];

    function PacienteEditarController(pacienteEditarData, entidades, PacienteService, $scope, $location) {
        console.log(pacienteEditarData)
        var vm = this;
        vm.cadastrar = cadastrar;
        vm.request = pacienteEditarData.paciente;
        vm.adicionarTelefone = adicionarTelefone;
        vm.removerTelefone = removerTelefone;
        vm.adicionarRedeSocial = adicionarRedeSocial;
        vm.removerRedeSocial = removerRedeSocial;
        vm.indicacoes = pacienteEditarData.indicacoes;
        vm.redesSociais = pacienteEditarData.redesSociais;

        function cadastrar(isValid) {
            if(isValid) {
                vm.request.put().then(function(response) {
                    $scope.cadastroForm.$setUntouched();
                    $scope.cadastroForm.$setPristine();
                    $location.path("/cadastro/paciente");
                }, function(response) {
                    toastr.error('Erro ao atualizar cadastro!');
                });
            }
        }

        function adicionarTelefone() {
            vm.request.contato.telefones.push(vm.telefone);
            vm.telefone = {};
        }

        function removerTelefone(index) {
            vm.request.contato.telefones.splice(index, 1);
        }

        function adicionarRedeSocial() {
            vm.request.redesSociaisPaciente.push(vm.redeSocialPacienteRequest);
            vm.redeSocialPacienteRequest = {};
        }

        function removerRedeSocial(index) {
            vm.request.redesSociaisPaciente.splice(index, 1);
        }
    }
})();
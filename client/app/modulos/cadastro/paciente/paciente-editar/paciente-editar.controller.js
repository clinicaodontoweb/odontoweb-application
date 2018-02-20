(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('PacienteEditarController', PacienteEditarController);

    PacienteEditarController.$inject = ['pacienteEditarData', 'entidades', 'PacienteService', '$scope', '$location'];

    function PacienteEditarController(pacienteEditarData, entidades, PacienteService, $scope, $location) {
        var vm = this;
        vm.toggle = toggle;
        vm.cadastrar = cadastrar;
        vm.paciente = pacienteEditarData;
        vm.buscaCep = buscaCep;

        vm.paciente.dataNascimento = new Date(pacienteEditarData.dataNascimento);

        function cadastrar(isValid) {
            if(isValid) {
                vm.paciente.put().then(function(response) {
                    $scope.pacienteForm.$setUntouched();
                    $scope.pacienteForm.$setPristine();
                    $location.path("/cadastro/paciente");
                }, function(response) {
                    toastr.error('Erro ao atualizar cadastro!');
                });
            }
        }

        function buscaCep() {
            if(vm.paciente.cep) {
                PacienteService.getCep(vm.paciente.cep)
                    .then(function(response) {
                        vm.paciente.enderecoResponse.endereco = response.data.logradouro;
                        vm.paciente.enderecoResponse.cidadeResponse.nome = response.data.localidade;
                        vm.paciente.enderecoResponse.bairroResponse.nome = response.data.bairro;
                        vm.paciente.enderecoResponse.cidadeResponse.estadoResponse.siglaResponse.sigla = response.data.uf;
                    }, function(response) {
                        toastr.error('Erro ao buscar cep, tente novamente!');
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
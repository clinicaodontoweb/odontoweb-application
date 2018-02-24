(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('PacienteEditarController', PacienteEditarController);

    PacienteEditarController.$inject = ['ApiService', 'pacienteEditarData', 'entidades', 'PacienteService', '$scope', '$location'];

    function PacienteEditarController(ApiService, pacienteEditarData, entidades, PacienteService, $scope, $location) {
        var vm = this;
        vm.toggle = toggle;
        vm.cadastrar = cadastrar;
        vm.paciente = pacienteEditarData;
        vm.buscaCep = buscaCep;

        vm.paciente.dataNascimento = new Date(pacienteEditarData.dataNascimento);
        vm.paciente.conveniosRequest = vm.paciente.conveniosResponse;
        vm.paciente.enderecoRequest = vm.paciente.enderecoResponse;
        vm.paciente.enderecoRequest.cepRequest = vm.paciente.enderecoResponse.cepResponse;
        vm.paciente.enderecoRequest.cidadeRequest = vm.paciente.enderecoResponse.cidadeResponse;
        vm.paciente.enderecoRequest.cidadeRequest.estadoRequest = vm.paciente.enderecoResponse.cidadeResponse.estadoResponse;
        vm.paciente.enderecoRequest.cidadeRequest.estadoRequest.siglaRequest = vm.paciente.enderecoResponse.cidadeResponse.estadoResponse.siglaResponse;
        vm.paciente.enderecoRequest.bairroRequest = vm.paciente.enderecoResponse.bairroResponse;
        vm.paciente.contatoRequest = vm.paciente.contatoResponse;

        delete vm.paciente.enderecoResponse.cepResponse;
        delete vm.paciente.enderecoResponse.cidadeResponse.estadoResponse.siglaResponse;
        delete vm.paciente.enderecoResponse.cidadeResponse.estadoResponse;
        delete vm.paciente.enderecoResponse.cidadeResponse;
        delete vm.paciente.enderecoResponse.bairroResponse
        delete vm.paciente.conveniosRequest;
        delete vm.paciente.enderecoResponse;
        delete vm.paciente.contatoResponse;
        delete vm.paciente.conveniosResponse

        activate();

        function activate() {
            ApiService.listaTodasEntidades(entidades.convenio).then(function(response) {
                vm.convenios = response;
            });
        }

        function cadastrar(isValid) {
            if(isValid) {
                vm.paciente.put().then(function(response) {
                    $scope.pacienteForm.$setUntouched();
                    $scope.pacienteForm.$setPristine();
                    $location.path("/cadastro/paciente");
                    toastr.success('Cadastro atualizado com sucesso!');
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
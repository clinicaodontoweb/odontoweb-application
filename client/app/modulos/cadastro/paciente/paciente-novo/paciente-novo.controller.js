(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('PacienteNovoController', PacienteNovoController);

    PacienteNovoController.$inject = ['pacienteNovoData', 'entidades', 'PacienteService', '$scope'];

    function PacienteNovoController(pacienteNovoData, entidades, PacienteService, $scope) {
        var vm = this;
        vm.toggle = toggle;
        vm.cadastrar = cadastrar;
        vm.paciente = {};
        vm.paciente.convenios = [];
        vm.convenios = pacienteNovoData;
        vm.buscaCep = buscaCep;

        function cadastrar(isValid) {
            if(isValid) {
                PacienteService.salvar(vm.paciente)
                    .then(function(dados) {
                        toastr.success(vm.paciente.nome, 'Paciente cadastrado com sucesso!');
                        vm.paciente = {};
                        $scope.pacienteForm.$setUntouched();
                        $scope.pacienteForm.$setPristine();
                        $location.path("/cadastro/paciente");
                    },function(error) {
                        toastr.error(error.data.mensagem, 'Erro ao cadastrar!');
                    });
            }
        }

        function buscaCep() {
            if(vm.paciente.cep) {
                PacienteService.getCep(vm.paciente.cep)
                    .then(function(response) {
                        vm.paciente.endereco = response.data.logradouro;
                        vm.paciente.cidade = response.data.localidade;
                        vm.paciente.bairro = response.data.bairro;
                        vm.paciente.uf = response.data.uf;
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
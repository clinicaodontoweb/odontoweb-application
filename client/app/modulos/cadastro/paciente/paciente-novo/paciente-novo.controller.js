(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('PacienteNovoController', PacienteNovoController);

    PacienteNovoController.$inject = ['ApiService', 'entidades', 'PacienteService', '$scope'];

    function PacienteNovoController(ApiService, entidades, PacienteService, $scope) {
        var vm = this;
        vm.toggle = toggle;
        vm.cadastrar = cadastrar;
        vm.paciente = {};
        vm.paciente.convenios = [];

        activate();

        function activate() {
            getAllConvenios();
        }

        function getAllConvenios() {
            return ApiService
                    .listaTodasEntidades(entidades.convenio)
                    .then(function(dados){
                        vm.convenios = dados;
                        return dados;
                    });
        }

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
(function() {
    'use strict';

    angular
        .module('odontoweb.agenda')
        .controller('AgendamentoNovoController', AgendamentoNovoController);

    AgendamentoNovoController.$inject = ['model', 'ApiService'];

    function AgendamentoNovoController(model, ApiService) {
        var vm = this;
        vm.dataInicio = model.dataInicio;
        vm.dataFim = model.dataFim;
        vm.usuarioClinica = model.usuarioClinica;
        vm.autocompletePaciente = autocompletePaciente;
        vm.completing = false;
        vm.selectPaciente = selectPaciente;
        vm.paciente = {};

        /*
        * Busca paciente pelo nome para o autocomplete
        */
        function autocompletePaciente(nome) {
            if(nome == "" || nome.length < 3) {
                vm.completing = false;
            }else {
                return ApiService
                    .listaTodasEntidades_two_id("paciente", "autocomplete", nome)
                    .then(function(dados) {
                        vm.pacientes = dados;
                        vm.completing = true;
                        return dados;
                    },function(error) {
                        toastr.error('Não foi possível buscar o paciente');
                    });
            }
            
        }

        function selectPaciente(paciente) {
            vm.paciente = paciente;
            vm.completing = false;
            vm.search = "";
            toastr.info('Paciente selecionado');
        }
        
    }
})();
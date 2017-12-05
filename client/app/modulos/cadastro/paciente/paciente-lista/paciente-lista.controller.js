(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('PacienteListaController', PacienteListaController);

    PacienteListaController.$inject = ['ApiService', 'entidades'];

    function PacienteListaController(ApiService, entidades) {
        var vm = this;

        activate();

        function activate() {
            getPacientes();
        }

        function getPacientes() {
            return ApiService
                .listaTodasEntidades(entidades.paciente)
                .then(function(dados) {
                    vm.pacientes = dados;
                    return dados;
                });
        }
    }
})();
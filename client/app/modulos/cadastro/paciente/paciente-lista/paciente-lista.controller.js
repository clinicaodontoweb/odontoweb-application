(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('PacienteListaController', PacienteListaController);

    PacienteListaController.$inject = ['pacienteListaData'];

    function PacienteListaController(pacienteListaData) {
        var vm = this;
        vm.pacientes = pacienteListaData;

    }
})();
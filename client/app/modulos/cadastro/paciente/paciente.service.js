(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .factory('PacienteService', PacienteService);

    PacienteService.$inject = ['Restangular'];

    function PacienteService(Restangular) {
        var service = {
            salvar: salvar
        };

        return service;

        function salvar(paciente) {
    		return Restangular.all('crud/paciente').post(paciente);
        }
    }
})();
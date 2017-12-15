(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .factory('PacienteService', PacienteService);

    PacienteService.$inject = ['Restangular', '$http'];

    function PacienteService(Restangular, $http) {
        var service = {
            salvar: salvar,
            getCep: getCep
        };

        return service;

        function salvar(paciente) {
    		return Restangular.all('crud/paciente').post(paciente);
        }

        function getCep(cep) {
            return $http.get('https://viacep.com.br/ws/' + cep + '/json/', {
                skipInterceptor: true
            });
        }
    }
})();
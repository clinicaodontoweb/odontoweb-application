(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .factory('RecepcionistaService', recepcionistaService);

    recepcionistaService.$inject = ['Restangular'];

    function recepcionistaService(Restangular) {
        var service = {
            salvar: salvar,
            getAllRecepcionistaByClinica: getAllRecepcionistaByClinica
        };

        return service;

        function salvar(recepcionista) {
    		return Restangular.all('auth/recepcionista').post(recepcionista);
        }

        function getAllRecepcionistaByClinica(cnpj) {
            return Restangular.all('auth/recepcionista/clinica/' + cnpj).getList();          
        }
    }
})();
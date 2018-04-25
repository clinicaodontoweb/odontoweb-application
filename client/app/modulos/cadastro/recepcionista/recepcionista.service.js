(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .factory('RecepcionistaService', recepcionistaService);

    recepcionistaService.$inject = ['Restangular'];

    function recepcionistaService(Restangular) {
        var service = {
            salvar: salvar,
            getAllRecepcionistaByClinica: getAllRecepcionistaByClinica,
            getRecepcionista: getRecepcionista
        };

        return service;

        function salvar(recepcionista) {
    		return Restangular.all('auth/recepcionista').post(recepcionista);
        }

        function getAllRecepcionistaByClinica(cnpj) {
            return Restangular.all('auth/recepcionista/clinica/' + cnpj).getList();          
        }

        function getRecepcionista(id) {
            return Restangular.one('auth').one('recepcionista', id).get();
        }
           
    }
})();
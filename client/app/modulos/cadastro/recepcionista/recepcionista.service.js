(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .factory('RecepcionistaService', recepcionistaService);

    recepcionistaService.$inject = ['Restangular'];

    function recepcionistaService(Restangular) {
        var service = {
            salvar: salvar
        };

        return service;

        function salvar(recepcionista) {
    		return Restangular.all('auth/recepcionista').post(recepcionista);
        }
    }
})();
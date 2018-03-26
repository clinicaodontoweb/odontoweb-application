(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .factory('StatusEventoService', statuseventoservice);

    statuseventoservice.$inject = ['Restangular'];

    function statuseventoservice(Restangular) {
        var service = {
            salvar: salvar,
            lista: lista
        };

        return service;

        function salvar(statusEvento) {
    		return Restangular.all('crud/status').post(statusEvento);
        }

        function lista() {
            return Restangular.one('crud').one('status').get();
        }
    }
})();
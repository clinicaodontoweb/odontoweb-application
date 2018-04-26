(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .factory('DentistaService', dentistaservice);

    dentistaservice.$inject = ['Restangular'];

    function dentistaservice(Restangular) {
        var service = {
            listaClinicasAndDentistas: listaClinicasAndDentistas,
            salvar: salvar,
            getDentista: getDentista
        };

        return service;

        function listaClinicasAndDentistas() {
    		return Restangular.one('auth').one('clinicas').get();
        }

        function salvar(dentista) {
    		return Restangular.all('auth/dentista').post(dentista);
        }

        function getDentista(id) {
            return Restangular.one('auth').one('dentista', id).get();
        }
    }
})();
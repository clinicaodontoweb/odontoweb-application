(function() {
    'use strict';

    angular
        .module('odontoweb.core')
        .factory('ApiService', apiservice);

    apiservice.$inject = ['Restangular'];

    function apiservice(Restangular) {
        var service = {
            listaTodasEntidades: listaTodasEntidades,
            listaTodasEntidades_id: listaTodasEntidades_id,
            listaTodasEntidades_two_id: listaTodasEntidades_two_id,
        };

        return service;

        function listaTodasEntidades(entidade) {
    		return Restangular.one('crud').getList(entidade);
        }
        
        function listaTodasEntidades_id(entidade, id, params) {
            return Restangular.one('crud').one(entidade, id).get(params);
        }

        function listaTodasEntidades_two_id(entidade, entidade2, id, params) {
            return Restangular.one('crud').one(entidade).one(entidade2, id).get(params);
        }
    }
})();
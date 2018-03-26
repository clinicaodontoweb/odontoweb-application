(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .factory('RedeSocialService', redesocialservice);

    redesocialservice.$inject = ['Restangular'];

    function redesocialservice(Restangular) {
        var service = {
            salvar: salvar,
            lista: lista
        };

        return service;

        function salvar(redeSocial) {
    		return Restangular.all('crud/redesocial').post(redeSocial);
        }

        function lista() {
            return Restangular.one('crud').one('redesocial').get();
        }
    }
})();
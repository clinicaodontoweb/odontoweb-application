(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .factory('IndicacaoService', indicacaoservice);

    indicacaoservice.$inject = ['Restangular'];

    function indicacaoservice(Restangular) {
        var service = {
            salvar: salvar,
            lista: lista
        };

        return service;

        function salvar(indicacao) {
    		return Restangular.all('crud/indicacao').post(indicacao);
        }

        function lista() {
            return Restangular.one('crud').one('indicacao').get();
        }
    }
})();
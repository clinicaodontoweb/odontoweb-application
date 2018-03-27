(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .factory('ConvenioService', convenioService);

    convenioService.$inject = ['Restangular', '$http'];

    function convenioService(Restangular, $http) {
        var service = {
            salvar: salvar,
            lista: lista,
            getCep: getCep
        };

        return service;

        function salvar(convenio) {
    		return Restangular.all('crud/convenio').post(convenio);
        }

        function lista() {
            return Restangular.one('crud').one('convenio').get();
        }

        function getCep(cep) {
            return $http.get('https://viacep.com.br/ws/' + cep + '/json/', {
                skipInterceptor: true
            });
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .factory('TipoConsultaService', tipoconsultaservice);

    tipoconsultaservice.$inject = ['Restangular'];

    function tipoconsultaservice(Restangular) {
        var service = {
            salvar: salvar,
            lista: lista
        };

        return service;

        function salvar(tipoConsulta) {
    		return Restangular.all('crud/tipoConsulta').post(tipoConsulta);
        }

        function lista() {
            return Restangular.one('crud').one('tipoConsulta').get();
        }
    }
})();
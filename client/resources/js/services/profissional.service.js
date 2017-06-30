(function() {
    'use strict';

    angular
        .module('OdontowebApp')
        .factory('prossionalservice', prossionalservice);

    prossionalservice.$inject = ['Restangular'];

    function prossionalservice(Restangular) {
        var service = {
            listaTodosProfissionais: listaTodosProfissionais
        };

        return service;

        function listaTodosProfissionais() {
    		return Restangular.all('profissional').getList();
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('odontoweb.core')
        .factory('ClinicaService', clinicaService);

    clinicaService.$inject = ['Restangular'];

    function clinicaService(Restangular) {
        var service = {
            getAllDentistasFromClinica: getAllDentistasFromClinica
        };

        return service;

        function getAllDentistasFromClinica(cnpj) {
    		return Restangular.all('auth').one('dentista').one('clinica', cnpj).getList();
        }

    }
})();
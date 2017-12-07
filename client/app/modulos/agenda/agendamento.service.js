(function() {
    'use strict';

    angular
        .module('odontoweb.agenda')
        .factory('AgendamentoService', agendamentoService);

    agendamentoService.$inject = ['Restangular'];

    function agendamentoService(Restangular) {
        var service = {
            agendar: agendar,
            getAgendamento: getAgendamento,
            deleteAgendamento: deleteAgendamento,
            getPaciente: getPaciente 
        };

        return service;

        function agendar(agendamento, hash) {
    		return Restangular.all('crud/agendamento/' + hash).post(agendamento);
        }

        function getAgendamento(idAgendamento) {
            return Restangular.one('crud').one('evento', idAgendamento).get();
        }

        function deleteAgendamento(idAgendamento) {
            return Restangular.one('crud').one('evento', idAgendamento).remove();
        }

        function getPaciente(field, str) {
            return Restangular.one('crud').one('evento').one('paciente').one(field, str).get();
        }
    }
})();
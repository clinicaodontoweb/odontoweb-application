(function() {
    'use strict';

    angular
        .module('odontoweb.agenda')
        .factory('AgendaService', agendaservice);

    function agendaservice() {
        var service = {
            buildEventos: buildEventos
        };

        return service;

        function buildEventos(eventos) {
            var agendamentos = [];
            eventos.forEach(function(evento){
                agendamentos.push(bindToEvento(evento));
            });
            return agendamentos;
        }

        function bindToEvento(evento) {
            return {
                idAgendamento: evento.idEvento,
                title: evento.pacienteResponse.nome,
                paciente: {
                  nome: evento.pacienteResponse.nome,
                  email: evento.pacienteResponse.contatoResponse.email,
                  telefone: (evento.pacienteResponse.contatoResponse.telefones.length > 0) ? evento.pacienteResponse.contatoResponse.telefones[0].numero : null
                },
                procedimento: evento.tipoConsultaResponse.nome,
                convenio: (evento.pacienteResponse.conveniosResponse) ? evento.pacienteResponse.conveniosResponse[0].nome : 'PARTICULAR',
                startsAt: new Date(evento.dataInicio),
                endsAt: new Date(evento.dataFim),
                status: evento.statusEvento,
                statusClass: 'list-group-item-info',
                color: {
                  primary: "#" + evento.tipoConsultaResponse.cor.split("#")[1],
                  secondary: "#" + evento.tipoConsultaResponse.cor.split("#")[2]
                }
            }
        }
    }
})();
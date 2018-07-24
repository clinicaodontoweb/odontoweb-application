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
                encaixe: evento.encaixe,
                title: evento.paciente.nome,
                paciente: {
                  nome: evento.paciente.nome,
                  email: evento.paciente.contato.email,
                  telefone: (evento.paciente.contato.telefones.length > 0) ? evento.paciente.contato.telefones[0].numero : null
                },
                procedimento: evento.tipoConsulta.nome,
                convenio: (evento.paciente.convenioPaciente) ? evento.paciente.convenioPaciente.convenio.nome : 'PARTICULAR',
                startsAt: new Date(evento.dataInicio),
                endsAt: new Date(evento.dataFim),
                status: evento.statusEvento.nome,
                observacao: evento.observacao,
                color: {
                  primary: evento.tipoConsulta.corPrimaria,
                  secondary: evento.tipoConsulta.corSecundaria
                }
            }
        }
    }
})();
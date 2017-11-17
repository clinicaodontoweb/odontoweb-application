(function() {
    'use strict';

    angular
        .module('odontoweb.agenda')
        .controller('AgendamentoDeletarController', AgendamentoDeletarController);

    AgendamentoDeletarController.$inject = ['model', 'AgendamentoService', 'ApiService', 'AgendaService', 'entidades', '$uibModalInstance'];

    function AgendamentoDeletarController(model, AgendamentoService, ApiService, AgendaService, entidades, $uibModalInstance) {
        var vm = this;
        vm.idAgendamento = model.idAgendamento;
        vm.usuarioClinica = model.usuarioClinica;
        vm.calendarView = model.calendarView,
        vm.viewDate = model.viewDate,
        vm.deletar = deletar;

        function deletar() {
            return AgendamentoService.deleteAgendamento(vm.idAgendamento)
                    .then(function(data) {
                        toastr.success('Agendamento excluído!');
                        $uibModalInstance.close(listaEventosDentista());
                    }, function(error) {
                        toastr.error('Não foi possível deletar este agendamento');
                    });
        }

        /*
        * Lista todos os eventos do dentista selecionado
        * retorna os eventos para o calendario
        */
        function listaEventosDentista() {
            var requestData = {
                usuarioClinica: vm.usuarioClinica,
                dataInicio: moment(vm.viewDate).startOf(vm.calendarView).valueOf(),
                dataFim: moment(vm.viewDate).endOf(vm.calendarView).valueOf()
            }

            return getEventosByDentista(requestData.usuarioClinica, requestData.dataInicio, requestData.dataFim);
        }

        /*
        * Busca todos os eventos de um dentista
        * recebe o hash do usuario clinica e o range de datas
        */
        function getEventosByDentista(hash, dataInicio, dataFim) {
            return ApiService
                    .listaTodasEntidades_two_id(entidades.evento, entidades.dentista, hash, {'dataInicio': dataInicio, 'dataFim': dataFim})
                    .then(function(dados) {
                        return AgendaService.buildEventos(dados);
                    },function(error){
                        return null;
                    });
        }

    }
})();
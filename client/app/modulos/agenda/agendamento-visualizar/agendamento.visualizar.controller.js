(function() {
    'use strict';

    angular
        .module('odontoweb.agenda')
        .controller('AgendamentoVisualizarController', AgendamentoVisualizarController);

    AgendamentoVisualizarController.$inject = ['model', '$uibModal', '$uibModalInstance'];

    function AgendamentoVisualizarController(model, $uibModal, $uibModalInstance) {
        var vm = this;
        vm.agendamento = model.agendamento;
        vm.alterarEvento = model.alterarEvento;
        vm.deletarEvento = model.deletarEvento;
        vm.alterarAgendamento = alterarAgendamento;
        vm.deletarAgendamento = deletarAgendamento;

        /*
        * Fechar modal de visualizar o agendamento
        * Abrir modal para editar o agendamento
        */
        function alterarAgendamento() {
            //fecha modal visualizar
            $uibModalInstance.close();

            //abre modal alterar evento
            vm.alterarEvento(vm.agendamento.idAgendamento);
        }

        /*
        * Fechar modal de visualizar o agendamento
        * Abrir modal para deletar o agendamento
        */
        function deletarAgendamento() {
            //fecha modal visualizar
            $uibModalInstance.close();

            //abre modal deletar evento
            vm.deletarEvento(vm.agendamento.idAgendamento);
        }
        
    }
})();
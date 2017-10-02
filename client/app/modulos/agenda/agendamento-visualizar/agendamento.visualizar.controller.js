(function() {
    'use strict';

    angular
        .module('odontoweb.agenda')
        .controller('AgendamentoVisualizarController', AgendamentoVisualizarController);

    AgendamentoVisualizarController.$inject = ['model'];

    function AgendamentoVisualizarController(model) {
        var vm = this;
        vm.agendamento = model.agendamento;

        console.log(model);
        
    }
})();
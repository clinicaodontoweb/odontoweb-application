(function() {
    'use strict';

    angular
        .module('odontoweb.agenda')
        .controller('AgendamentoController', AgendamentoController);

    AgendamentoController.$inject = ['model'];

    function AgendamentoController(model) {
        var vm = this;
        vm.dataInicio = model.dataInicio;
        vm.dataFim = model.dataFim;
        vm.usuarioClinica = model.usuarioClinica;

        console.log(model);
        
    }
})();
(function() {
    'use strict';

    angular
        .module('odontoweb.agenda')
        .controller('AgendamentoNovoController', AgendamentoNovoController);

    AgendamentoNovoController.$inject = ['model'];

    function AgendamentoNovoController(model) {
        var vm = this;
        vm.dataInicio = model.dataInicio;
        vm.dataFim = model.dataFim;
        vm.usuarioClinica = model.usuarioClinica;

        console.log(model);
        
    }
})();
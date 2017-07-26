(function() {
    'use strict';

    angular
        .module('odontoweb.agenda')
        .controller('AgendamentoController', AgendamentoController);

    AgendamentoController.$inject = ['model'];

    function AgendamentoController(model) {
        var vm = this;
        vm.title = "andre";
        vm.data = model.data;
        vm.profissional = model.profissional;

        console.log(model);
        
    }
})();
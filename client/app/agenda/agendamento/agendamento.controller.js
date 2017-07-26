(function() {
    'use strict';

    angular
        .module('OdontowebApp')
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
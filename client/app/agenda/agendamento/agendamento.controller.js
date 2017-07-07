(function() {
    'use strict';

    angular
        .module('OdontowebApp')
        .controller('AgendamentoController', AgendamentoController);

    AgendamentoController.$inject = ['event'];

    function AgendamentoController(event) {
        var vm = this;
        vm.title = "andre";
        vm.event = event;

        activate();

        function activate() {}

        
    }
})();
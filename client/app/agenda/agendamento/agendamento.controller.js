(function() {
    'use strict';

    angular
        .module('OdontowebApp')
        .controller('AgendamentoController', AgendamentoController);

    //AgendamentoController.$inject = ['dependencies'];

    function AgendamentoController() {
        var vm = this;
        vm.title = "andre";

        activate();

        function activate() {}

        
    }
})();
(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('IndicacaoListaController', IndicacaoListaController);

    IndicacaoListaController.$inject = ['indicacaoListaData'];

    function IndicacaoListaController(indicacaoListaData) {
        var vm = this;
        vm.indicacoes = indicacaoListaData;

    }
})();
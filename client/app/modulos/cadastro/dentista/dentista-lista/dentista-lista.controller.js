(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('DentistaListaController', DentistaListaController);

    DentistaListaController.$inject = ['dentistaListaData'];

    function DentistaListaController(dentistaListaData) {
        var vm = this;
        vm.dentistas = dentistaListaData.dentistas;

        console.log(vm.dentistas)

    }
})();
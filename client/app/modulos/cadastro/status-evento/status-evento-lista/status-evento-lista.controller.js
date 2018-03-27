(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('StatusEventoListaController', StatusEventoListaController);

    StatusEventoListaController.$inject = ['statusListaData'];

    function StatusEventoListaController(statusListaData) {
        var vm = this;
        vm.status = statusListaData;

    }
})();
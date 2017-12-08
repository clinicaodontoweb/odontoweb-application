(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('RecepcionistaListaController', RecepcionistaListaController);

    RecepcionistaListaController.$inject = ['recepcionistaListaData'];

    function RecepcionistaListaController(recepcionistaListaData) {
        var vm = this;
        vm.recepcionistas = recepcionistaListaData;

    }
})();
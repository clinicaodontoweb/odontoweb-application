(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('ConvenioListaController', ConvenioListaController);

    ConvenioListaController.$inject = ['convenioListaData'];

    function ConvenioListaController(convenioListaData) {
        var vm = this;
        vm.convenios = convenioListaData;

    }
})();
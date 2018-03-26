(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('TipoConsultaListaController', TipoConsultaListaController);

    TipoConsultaListaController.$inject = ['tipoConsultaListaData'];

    function TipoConsultaListaController(tipoConsultaListaData) {
        var vm = this;
        vm.tipoConsultas = tipoConsultaListaData.status;

    }
})();
(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('DentistaListaController', DentistaListaController);

    DentistaListaController.$inject = ['entidades', 'DentistaService'];

    function DentistaListaController(entidades, DentistaService) {
        var vm = this;

        activate();

        function activate() {
            getClinicasAndDentistas();
        }

        function getClinicasAndDentistas() {
            return DentistaService
                .listaClinicasAndDentistas()
                .then(function(dados) {
                    vm.dentistas = dados.dentistas;
                    return dados;
                });
        }
    }
})();
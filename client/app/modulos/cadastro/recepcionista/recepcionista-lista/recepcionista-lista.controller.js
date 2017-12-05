(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('RecepcionistaListaController', RecepcionistaListaController);

    RecepcionistaListaController.$inject = ['RecepcionistaService', 'AutenticacaoService'];

    function RecepcionistaListaController(RecepcionistaService, AutenticacaoService) {
        var vm = this;

        activate();

        function activate() {
            getClinicasAndDentistas();
        }

        function getClinicasAndDentistas() {
            return RecepcionistaService
                .getAllRecepcionistaByClinica(AutenticacaoService.getCurrentTenant().cnpj)
                .then(function(dados) {
                    vm.recepcionistas = dados;
                    return dados;
                });
        }
    }
})();
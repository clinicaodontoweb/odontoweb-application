(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('RedeSocialListaController', RedeSocialListaController);

    RedeSocialListaController.$inject = ['redeSocialListaData'];

    function RedeSocialListaController(redeSocialListaData) {
        var vm = this;
        vm.redeSociais = redeSocialListaData;

    }
})();
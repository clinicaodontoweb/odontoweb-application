(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('PacienteNovoController', PacienteNovoController);

    PacienteNovoController.$inject = [];

    function PacienteNovoController() {
        var vm = this;

        activate();

        function activate() { }
    }
})();
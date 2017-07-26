(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('ProfissionalController', ProfissionalController);

    ProfissionalController.$inject = ['ApiService', 'entidades', '$uibModal'];

    function ProfissionalController(ApiService, entidades, $uibModal) {
      var vm = this;
      
      activate();

      function activate() {}


    }
})();

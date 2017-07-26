(function() {
    'use strict';

    angular
        .module('OdontowebApp')
        .controller('ProfissionalController', ProfissionalController);

    ProfissionalController.$inject = ['ApiService', 'entidades', '$uibModal'];

    function ProfissionalController(ApiService, entidades, $uibModal) {
      var vm = this;
      
      activate();

      function activate() {}


    }
})();

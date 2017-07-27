(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('DentistaController', DentistaController);

    DentistaController.$inject = ['ApiService', 'entidades', '$uibModal'];

    function DentistaController(ApiService, entidades, $uibModal) {
      var vm = this;
      
      activate();

      function activate() {}


    }
})();

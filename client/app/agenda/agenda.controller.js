(function() {
    'use strict';

    angular
        .module('OdontowebApp')
        .controller('AgendaController', AgendaController);

    AgendaController.$inject = ['ApiService', 'entidades'];

    function AgendaController(ApiService, entidades) {
      var vm = this;
      vm.profissionais = [];
      vm.eventos = [];
      vm.calendarView = 'month';
      vm.eventClicked = eventClicked;

      activate();

      function activate() {
        getProfissionais();
        getEventos();
      }

      function getProfissionais() {
        return ApiService.listaTodasEntidades(entidades.profissional).then(function(profissionais) {
          vm.profissionais = profissionais;
          return vm.profissionais;
        });
      }

      function getEventos() {
        return ApiService.listaTodasEntidades_two_id(entidades.evento, entidades.profissional, 1, {dataInicio: 1462935600472, dataFim: 1463021999472}).then(function(eventos) {
          vm.eventos = eventos;
          return vm.eventos;
        });
      }

      function eventClicked(event) {
        alert(event);
      }

    }
})();

/*app.controller('AgendaController', ['$scope', 'alert', function($scope, alert){
	
  $scope.calendarView = 'month';
	$scope.viewDate = new Date();
	$scope.events = [
      {
        title: 'André Nunes',
        paciente: {
          nome: 'André Nunes',
          email: 'andre@gmail.com',
          telefone: 85905497
        },
        procedimento: 'Consulta',
        convenio: 'Unimed',
        startsAt: moment().startOf('day').add(13, 'hours').toDate(),
        endsAt: moment().startOf('day').add(13, 'hours').add(30, 'minutes').toDate(),
        status: 'Confirmada',
        statusClass: 'list-group-item-info',
        color: {
          primary: '#31708f',
          secondary: '#d9edf7'
        }
      }, {
        title: 'Fernando da Rosa',
        paciente: {
          nome: 'Fernando da Rosa',
          email: 'fernando@gmail.com',
          telefone: 85905497
        },
        procedimento: 'Limpeza',
        convenio: 'Itáu',
        startsAt: moment().startOf('week').add(7, 'hours').toDate(),
        endsAt: moment().startOf('week').add(7, 'hours').add(30, 'minutes').toDate(),
        status: 'Atendido',
        statusClass: 'list-group-item-success',
        color: {
          primary: '#3c763d',
          secondary: '#dff0d8'
        }
      }, {
        title: 'Paulo Ricardo',
        paciente: {
          nome: 'Paulo Ricardo',
          email: 'paulo@gmail.com',
          telefone: 85905497
        },
        procedimento: 'Consulta',
        convenio: 'Unimed',
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(7, 'hours').add(30, 'minutes').toDate(),
        status: 'Cancelado',
        statusClass: 'list-group-item-danger',
        color: {
          primary: '#a94442',
          secondary: '#f2dede'
        }
      }
    ];
  $scope.eventClicked = function(event){
    alert.show(event);
  }
}]);*/
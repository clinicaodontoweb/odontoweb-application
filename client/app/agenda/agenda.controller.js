(function() {
    'use strict';

    angular
        .module('OdontowebApp')
        .controller('AgendaController', AgendaController);

    AgendaController.$inject = ['ApiService', 'entidades', '$uibModal'];

    function AgendaController(ApiService, entidades, $uibModal) {
      var vm = this;
      vm.profissionais = [];
      vm.eventos = [];
      vm.calendarView = 'month';
      vm.viewDate = new Date();
      vm.cellIsOpen = false;
      vm.cadastrarEvento = cadastrarEvento;
      vm.visualizarEvento = visualizarEvento;
      vm.viewChange = viewChange;
      vm.dataInicio = moment().startOf('month').valueOf();
      vm.dataFim = moment().endOf('month').valueOf();

      activate();

      function activate() {
        getProfissionais();
        getEventos();
      }

      function getProfissionais() {
        return ApiService.listaTodasEntidades(entidades.profissional).then(function(profissionais) {
          vm.profissionais = profissionais;
          return vm.profissionais;
        }, function(response) {
          console.log("Error with status code", response.status);
        });
      }

      function getEventos() {
        return ApiService.listaTodasEntidades_two_id(entidades.evento, entidades.profissional, 1, {dataInicio: vm.dataInicio, dataFim: vm.dataFim}).then(function(eventos) {
          vm.eventos = buildCalendar(eventos);
          return vm.eventos;
        }, function(response) {
          console.log("Error with status code", response.status);
        });
      }

      function cadastrarEvento(){
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/agenda/agendamento/agendamento-novo.view.html',
          size: 'lg',
          controller: 'AgendamentoController',
          controllerAs: 'vm'
        });
      }

      function visualizarEvento(event){
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/agenda/agendamento/agendamento-detalhes.view.html',
          size: 'lg',
          controller: 'AgendamentoController',
          controllerAs: 'vm',
          resolve: {
            event: function () {
             return event;
            }
          }
        });
      }

      function buildCalendar(eventosResponse) {
        var eventos = [];
        eventosResponse.forEach(function(evento) { 
          eventos.push(buildEvento(evento));
        });

        return eventos;
      }

      function buildEvento(evento) {
        return {
          title: evento.pacienteResponse.nome,
          paciente: {
            nome: evento.pacienteResponse.nome,
            email: evento.pacienteResponse.contatoResponse.email,
            telefone: evento.pacienteResponse.contatoResponse.telefones[0].numero
          },
          procedimento: evento.tipoConsultaResponse.nome,
          convenio: (evento.pacienteResponse.convenioResponse) ? evento.pacienteResponse.convenioResponse.nome : 'PARTICULAR',
          startsAt: new Date(evento.ano, evento.mes, evento.dia, evento.horaInicio, evento.minutoInicio),
          endsAt: new Date(evento.ano, evento.mes, evento.dia, evento.horaFim, evento.minutoFim),
          status: evento.statusEvento,
          statusClass: 'list-group-item-info',
          color: {
            primary: '#31708f',
            secondary: '#d9edf7'
          }
        }
      }

      function viewChange(calendarDate, calendarNextView) {
        console.log(calendarDate);
        console.log(calendarNextView);
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
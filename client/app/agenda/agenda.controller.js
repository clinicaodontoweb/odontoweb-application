(function() {
    'use strict';

    angular
        .module('OdontowebApp')
        .controller('AgendaController', AgendaController);

    AgendaController.$inject = ['ApiService', 'entidades', '$uibModal'];

    function AgendaController(ApiService, entidades, $uibModal) {
      var vm = this;
      vm.profissionais = [];
      vm.profissionalAtivo = {};
      vm.eventos = [];
      vm.calendarView = 'month';
      vm.viewDate = new Date();
      vm.viewChange = viewChange;
      vm.cellIsOpen = false;
      vm.cadastrarEvento = cadastrarEvento;
      vm.visualizarEvento = visualizarEvento;
      vm.atualizarAgenda = atualizarAgenda;
      vm.data = {
        dataInicio: moment().startOf('month').valueOf(),
        dataFim: moment().endOf('month').valueOf()
      };

      activate();

      function activate() {
        getProfissionais().then(getEventos);
      }

      function getProfissionais() {
        return ApiService
                  .listaTodasEntidades(entidades.profissional)
                  .then(function(profissionais) {
                    vm.profissionais = profissionais;
                    vm.profissionalAtivo = profissionais[0]
                    return vm.profissionalAtivo;
                  });
      }

      function getEventos(profissional) {
        return ApiService
                  .listaTodasEntidades_two_id(entidades.evento, entidades.profissional, profissional.idProfissional, vm.data)
                  .then(function(eventos) {
                    vm.eventos = buildCalendar(eventos);
                    return vm.eventos;
                  });
      }

      function atualizarAgenda(profissional) {
        vm.profissionalAtivo = profissional;
        getEventos(profissional);
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
            telefone: (evento.pacienteResponse.contatoResponse.telefones.length > 0) ? evento.pacienteResponse.contatoResponse.telefones[0].numero : null
          },
          procedimento: evento.tipoConsultaResponse.nome,
          convenio: (evento.pacienteResponse.convenioResponse) ? evento.pacienteResponse.convenioResponse.nome : 'PARTICULAR',
          startsAt: new Date(evento.dataInicio),
          endsAt: new Date(evento.dataFim),
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
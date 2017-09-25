(function() {
    'use strict';

    angular
        .module('odontoweb.agenda')
        .controller('AgendaController', AgendaController);

    AgendaController.$inject = ['AutenticacaoService', 'ClinicaService', 'ApiService', 'entidades'];

    function AgendaController(AutenticacaoService, ClinicaService, ApiService, entidades) {
      var vm = this;
      vm.data = {
        dataInicio: moment().startOf('month').valueOf(),
        dataFim: moment().endOf('month').valueOf()
      };
      vm.eventos = [];
      vm.calendarView = 'month';
      vm.viewDate = new Date();
      vm.cellIsOpen = false;
      vm.dentistas = [];
      vm.atualizarAgenda = atualizarAgenda;

      activate();

      function activate() {
        if(AutenticacaoService.isDentista())
          loadDentistaData()
        else
          loadRecepcionistaData()
      }

      function loadDentistaData() {
        var email = AutenticacaoService.getCurrentUser().email;
        getEventosByDentista(email);
      }

      function loadRecepcionistaData() {
        var cnpj = AutenticacaoService.getCurrentTenant().cnpj;
        listaDentistas(cnpj);
      }

      function listaDentistas(cnpj) {
        return ClinicaService
                .getAllDentistasFromClinica(cnpj)
                .then(function(dados) {
                    vm.dentistas = dados;
                    vm.dentistaAtivo = dados[0]
                    vm.eventos = getEventosByDentista(dados[0].usuarioResponse.email);
                    return dados;
                });
      }

      function atualizarAgenda(dentista) {
        vm.dentistaAtivo = dentista;
        getEventosByDentista(dentista.usuarioResponse.email);
      }

      function getEventosByDentista(email) {
        return ApiService
                .listaTodasEntidades_two_id(entidades.evento, entidades.dentista, email, vm.data)
                .then(function(dados) {
                  console.log(dados);
                  return dados;
                });
      }


    }
})();


/*

      vm.profissionais = [];
      vm.profissionalAtivo = {};
      vm.eventos = [];
      vm.calendarView = 'month';
      vm.viewDate = new Date();
      vm.viewChange = viewChange;
      vm.cellIsOpen = false;
      vm.cadastrarEvento = cadastrarEvento;
      vm.selecionarData = selecionarData;
      vm.visualizarEvento = visualizarEvento;
      vm.atualizarAgenda = atualizarAgenda;
      vm.data = {
        dataInicio: moment().startOf('month').valueOf(),
        dataFim: moment().endOf('month').valueOf()
      };
      vm.dataSelecionada = moment();

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

function visualizarEvento(event){
  var modalInstance = $uibModal.open({
    animation: true,
    templateUrl: 'partials/modulos/agenda/agendamento/agendamento-detalhes.view.html',
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

function selecionarData(date) {
  vm.dataSelecionada = date;
  cadastrarEvento(vm.dataSelecionada);
}

function cadastrarEvento(data){
  var modalInstance = $uibModal.open({
    animation: true,
    templateUrl: 'partials/modulos/agenda/agendamento/agendamento-novo.view.html',
    size: 'lg',
    controller: 'AgendamentoController',
    controllerAs: 'vm',
    resolve: {
      model: function () {
       return {
         data: data,
         profissional: vm.profissionalAtivo
        };
      }
    }
  });
}

function viewChange(calendarDate, calendarNextView) {
  console.log(calendarDate);
  console.log(calendarNextView);
} */
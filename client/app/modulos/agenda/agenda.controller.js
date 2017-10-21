(function() {
    'use strict';

    angular
        .module('odontoweb.agenda')
        .controller('AgendaController', AgendaController);

    AgendaController.$inject = ['AgendaService', 'AutenticacaoService', 'ClinicaService', 'ApiService', 'entidades', '$uibModal'];

    function AgendaController(AgendaService, AutenticacaoService, ClinicaService, ApiService, entidades, $uibModal) {
      var vm = this;
      vm.dataInicio = moment().startOf('week').valueOf();
      vm.dataFim = moment().endOf('week').valueOf();
      vm.viewDate = moment();
      vm.calendarView = 'week';
      vm.cellIsOpen = false;
      vm.navigateCalendar = navigateCalendar;
      vm.atualizarAgendaByDentista = atualizarAgendaByDentista;
      vm.cadastrarEvento = cadastrarEvento;
      vm.visualizarEvento = visualizarEvento;
      vm.eventos = [];
      vm.dentistas = [];
      vm.dentistaAtivo = {};

      activate();

      function activate() {
        if(AutenticacaoService.isDentista())
          loadDentistaData()
        else
          loadRecepcionistaData()
      }

      /*
      * Busca todos os eventos do dentista ativo
      */
      function loadDentistaData() {
        var date = resolveDate();
        getEventosByDentista(resolveUsuarioHash(), date.dataInicio, date.dataFim);
      }

      /*
      * Busca todos os dentistas para a recepcionista logada
      * busca os eventos para o dentista ativo
      */
      function loadRecepcionistaData() {
        var cnpj = AutenticacaoService.getCurrentTenant().cnpj;
        listaDentistas(cnpj)
              .then(atualizarAgendaByDentista, listaDentistaError);
      }

      /*
      * Mensagem de erro caso nao encontre dentistas
      */
      function listaDentistaError(error) {
        toastr.error(error.data.mensagem, 'Erro ao buscar dentistas!');
      }

      /*
      * Busca todos os dentistas de uma clinica
      * recebe o cnpj da clinica
      * atualiza a lista de dentistas e o dentista ativo
      */
      function listaDentistas(cnpj) {
        return ClinicaService
                .getAllDentistasFromClinica(cnpj)
                .then(function(dados) {
                    vm.dentistas = dados;
                    return dados[0];
                });
      }


      /*
      * Atualizar o dentista ativo e buscar seus eventos
      * recebe o dentista selecionado
      */
      function atualizarAgendaByDentista(dentista) {
        var date = resolveDate();
        vm.dentistaAtivo = dentista;
        getEventosByDentista(resolveUsuarioHash(), date.dataInicio, date.dataFim);
      }

      /*
      * Busca todos os eventos de um dentista
      * recebe o hash do usuario clinica e o range de datas
      */
      function getEventosByDentista(hash, dataInicio, dataFim) {
        return ApiService
                .listaTodasEntidades_two_id(entidades.evento, entidades.dentista, hash, {'dataInicio': dataInicio, 'dataFim': dataFim})
                .then(function(dados) {
                  // atualiza os eventos no calendario
                  vm.eventos = AgendaService.buildEventos(dados);
                  // mensagem quantidade de eventos encontrados
                  dateChangedMessage(dados.length, (dados.length == 0) ? true : false);
                  return dados;
                },function(error){
                  dateChangedMessage(undefined, true);
                });
      }

      /* 
      * Atualizar os eventos clicando no anterior / hoje / proximo 
      * atualizar os eventos clicando no modo de visualizacao
      * somente busca eventos se o modo de visualizacao for semana ou dia
      * busca eventos do usuario logado se for dentista ou do dentista ativo se for recepcionista
      */
      function navigateCalendar(date, view) {
        console.log(date);
        console.log(view);
        if(view)
          vm.calendarView = view;

        if(vm.calendarView === 'week' || vm.calendarView === 'day') {
          var requestData = {
            usuarioClinica: resolveUsuarioHash(),
            dataInicio: moment((date) ? date : vm.viewDate).startOf(vm.calendarView).valueOf(),
            dataFim: moment((date) ? date : vm.viewDate).endOf(vm.calendarView).valueOf()
          }

          getEventosByDentista(requestData.usuarioClinica, requestData.dataInicio, requestData.dataFim);

          console.log(vm.calendarView);
          console.log("atualizar eventos, data inicio ", requestData.dataInicio);
          console.log("atualizar eventos, data fim ", requestData.dataFim);

        }
      }
      
      /*
      * Abrir modal para cadastar o evento
      * passa como parametro a data inicial e a data final e o hash do dentista selecionado
      * hash do usuario logado se for dentista ou do dentista ativo se for recepcionista
      */
      function cadastrarEvento(startDate, endDate) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/modulos/agenda/agendamento-novo/agendamento-novo.view.html',
          size: 'lg',
          controller: 'AgendamentoNovoController',
          controllerAs: 'vm',
          resolve: {
            model: function () {
              return {
                dataInicio: (startDate) ? startDate : vm.dataInicio,
                dataFim: (endDate) ? endDate : vm.dataFim,
                usuarioClinica: resolveUsuarioHash()
              };
            }
          }
        });
      }

      /* 
      * Abre a modal com o evento selecionado para visualizacao
      */
      function visualizarEvento(event){
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/modulos/agenda/agendamento-visualizar/agendamento-visualizar.view.html',
          size: 'lg',
          controller: 'AgendamentoVisualizarController',
          controllerAs: 'vm',
          resolve: {
            model: function () {
              return {
               agendamento: event
              };
            }
          }
        });
      }

      /*
      * Valida o tipo de usuario logado e retorna o hash do dentista ativo
      */
      function resolveUsuarioHash() {
        if(AutenticacaoService.isDentista())
          return AutenticacaoService.getCurrentUser().hashKey;
        else
          return vm.dentistaAtivo.usuarioResponse.hashKey
      }

      /*
      * Valida a data ativada no calendario baseado na visao atual
      */
      function resolveDate() {
        var date = (vm.calendarView === 'week' || vm.calendarView === 'day') ? moment(vm.viewDate) : moment();
        return {
          dataInicio: date.startOf(vm.calendarView).valueOf(),
          dataFim: date.endOf(vm.calendarView).valueOf()
        }
      }

      /*
      * Mensagem quando troca de data
      */
      function dateChangedMessage(quantidade, error) {
        if(error)
          toastr.error('Você não tem agendamentos para o período selecionado!');
        else
          toastr.success('Você tem ('+quantidade+') agendamentos para o período selecionado!');        
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
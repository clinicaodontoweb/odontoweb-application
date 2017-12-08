(function() {
    'use strict';

    angular
        .module('odontoweb.agenda')
        .controller('AgendaController', AgendaController);

    AgendaController.$inject = ['AgendamentoService', 'AgendaService', 'AutenticacaoService', 'ClinicaService', 'ApiService', 'entidades', '$uibModal'];

    function AgendaController(AgendamentoService, AgendaService, AutenticacaoService, ClinicaService, ApiService, entidades, $uibModal) {
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
      vm.autocompletePaciente = autocompletePaciente;
      vm.completing = false;
      vm.clearResults = clearResults;

      activate();

      function activate() {
        if(AutenticacaoService.isDentista())
          loadDentistaData()
        else
          loadRecepcionistaData()
      }

      /*
      * Busca paciente pelo nome para o autocomplete
      */
      function autocompletePaciente(str) {
        if(str == "" || str.length < 3) {
            vm.completing = false;
        }else {
          var field = str.match(/^\d/) ? "cpf": "nome";
          return AgendamentoService
                  .getPaciente(field, str)
                  .then(function(dados) {
                      vm.eventosAutocomplete = AgendaService.buildEventos(dados);
                      vm.completing = true;
                      return dados;
                  },function(error) {
                      toastr.error('Não foi possível buscar o paciente');
                  });
        }
      }

      /*
      * Limpa resultados do autocomplete
      */
      function clearResults() {
        vm.completing = false;
        vm.search = null;
        vm.eventosAutocomplete = null;
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
                usuarioClinica: resolveUsuarioHash(),
                viewDate: vm.viewDate,
                calendarView: vm.calendarView
              };
            }
          }
        });

        modalInstance.result.then(function (eventos) {
          vm.eventos = eventos;
        });
      }

      /*
      * Abrir modal para editar o agendamento
      */
      function alterarEvento(id) {
        //cria modal de alterar agendamento
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'partials/modulos/agenda/agendamento-editar/agendamento-editar.view.html',
            size: 'lg',
            controller: 'AgendamentoEditarController',
            controllerAs: 'vm',
            resolve: {
                model: function () {
                    return {
                        idAgendamento: id,
                        usuarioClinica: resolveUsuarioHash(),
                        viewDate: vm.viewDate,
                        calendarView: vm.calendarView
                    };
                }
            }
        });

        modalInstance.result.then(function (eventos) {
            vm.eventos = eventos;
        });
      }

      /*
      * Abrir modal para deletar o agendamento
      */
      function deletarEvento(id) {
        //cria modal de alterar agendamento
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'partials/modulos/agenda/agendamento-deletar/agendamento-deletar.view.html',
            size: 'lg',
            controller: 'AgendamentoDeletarController',
            controllerAs: 'vm',
            resolve: {
                model: function () {
                    return {
                        idAgendamento: id,
                        usuarioClinica: resolveUsuarioHash(),
                        viewDate: vm.viewDate,
                        calendarView: vm.calendarView
                    };
                }
            }
        });

        modalInstance.result.then(function (eventos) {
            vm.eventos = eventos;
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
               agendamento: event,
               alterarEvento: alterarEvento,
               deletarEvento: deletarEvento
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
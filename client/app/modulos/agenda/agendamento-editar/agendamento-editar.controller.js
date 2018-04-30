(function() {
    'use strict';

    angular
        .module('odontoweb.agenda')
        .controller('AgendamentoEditarController', AgendamentoEditarController);

    AgendamentoEditarController.$inject = ['model', 'AgendamentoService', '$uibModalInstance', 'ApiService', 'entidades', 'AgendaService'];

    function AgendamentoEditarController(model, AgendamentoService, $uibModalInstance, ApiService, entidades, AgendaService) {
        var vm = this;
        vm.idAgendamento = model.idAgendamento;
        vm.usuarioClinica = model.usuarioClinica;
        vm.calendarView = model.calendarView,
        vm.viewDate = model.viewDate,
        vm.agendamento = {};
        vm.autocompletePaciente = autocompletePaciente;
        vm.completing = false;
        vm.selectPaciente = selectPaciente;
        vm.alterar = alterar;

        activate();

        function activate() {
            loadAgendamento(vm.idAgendamento);
            listaTiposConsulta();
            listaStatusConsulta();
            listaConvenios();
        }

        /*
        * Busca paciente pelo nome para o autocomplete
        */
        function autocompletePaciente(nome) {
            if(nome == "" || nome.length < 3) {
                vm.completing = false;
            }else {
                return ApiService
                    .listaTodasEntidades_two_id("paciente", "autocomplete", nome)
                    .then(function(dados) {
                        vm.pacientes = dados;
                        vm.completing = true;
                        return dados;
                    },function(error) {
                        toastr.error('Não foi possível buscar o paciente');
                    });
            }
            
        }

        /*
        * Seleciona o paciente no autocomplete
        */
        function selectPaciente(paciente) {
            vm.agendamento.paciente = paciente;
            vm.completing = false;
            vm.search = "";
        }

        /*
        * Carrega o agendamento pelo ID
        */
        function loadAgendamento(idAgendamento) {
            return AgendamentoService.getAgendamento(idAgendamento)
                        .then(function(evento) {
                            vm.agendamento = buildAgendamentoModel(evento);
                        }, function(error) {
                            $uibModalInstance.close();
                            toastr.error('Erro ao buscar agendamento!');
                        });
        }

        /*
        * Busca todos os tipos de consulta
        */
        function listaTiposConsulta() {
            return ApiService
                    .listaTodasEntidades(entidades.tipoConsulta)
                    .then(function(dados) {
                        vm.tiposConsulta = dados;
                        return dados;
                    },function(error){
                        console.log(error);
                    });
        }

        /*
        * Lista status de consulta
        */
       function listaConvenios() {
            return ApiService
                .listaTodasEntidades(entidades.convenio)
                .then(function(dados) {
                    vm.convenios = dados;
                    return dados;
                },function(error){
                    console.log(error);
                });
        }

        /*
        * Lista status de consulta
        */
        function listaStatusConsulta() {
            return ApiService
                .listaTodasEntidades(entidades.status)
                .then(function(dados) {
                    vm.statusConsulta = dados;
                    return dados;
                },function(error){
                    console.log(error);
                });
        }

        /*
        * Monsta o objeto do model
        */
        function buildAgendamentoModel(agendamento) {
            return {
                idEvento: agendamento.idEvento,
                encaixe: agendamento.encaixe,
                statusConsulta: agendamento.statusEvento,
                observacao: agendamento.observacao,
                dataInicio: new Date(agendamento.dataInicio),
                dataFim: new Date(agendamento.dataFim),
                tipoConsulta: agendamento.tipoConsulta,
                paciente: agendamento.paciente,
                convenio: agendamento.convenioPaciente.convenio
            }
        }

        /*
        * Altera consulta
        */
        function alterar() {
            vm.request = buildRequestModel();
            return AgendamentoService.agendar(vm.request, vm.usuarioClinica)
                    .then(function(dados) {
                        toastr.success('Agendamento salvo com sucesso!');
                        $uibModalInstance.close(listaEventosDentista());
                    },function(error) {
                        toastr.error('Erro ao salvar agendamento!');
                    });
        }

        /*
        * Monta o objeto do agendamento
        */
        function buildRequestModel() {
            return {
                encaixe: vm.agendamento.encaixe,
                observacao: vm.agendamento.observacao,
                dataInicio: vm.agendamento.dataInicio.getTime(),
                dataFim: vm.agendamento.dataFim.getTime(),
                idStatus: vm.agendamento.statusConsulta.idStatus,
                idTipoConsulta: vm.agendamento.tipoConsulta.idTipoConsulta,
                idPaciente: vm.agendamento.paciente.idPaciente,
                convenioPaciente: {
                    convenio: vm.agendamento.convenio,
                    numero: vm.agendamento.convenio.numero,
                    titularConvenio: vm.agendamento.convenio.titular,
                }
            }
        }

        /*
        * Lista todos os eventos do dentista selecionado
        * retorna os eventos para o calendario
        */
        function listaEventosDentista() {
            var requestData = {
                usuarioClinica: vm.usuarioClinica,
                dataInicio: moment(vm.viewDate).startOf(vm.calendarView).valueOf(),
                dataFim: moment(vm.viewDate).endOf(vm.calendarView).valueOf()
            }

            return getEventosByDentista(requestData.usuarioClinica, requestData.dataInicio, requestData.dataFim);
        }

        /*
        * Busca todos os eventos de um dentista
        * recebe o hash do usuario clinica e o range de datas
        */
        function getEventosByDentista(hash, dataInicio, dataFim) {
            return ApiService
                    .listaTodasEntidades_two_id(entidades.evento, entidades.dentista, hash, {'dataInicio': dataInicio, 'dataFim': dataFim})
                    .then(function(dados) {
                        return AgendaService.buildEventos(dados);
                    },function(error){
                        return null;
                    });
        }
    }
})();
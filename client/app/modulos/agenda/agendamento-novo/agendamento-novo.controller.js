(function() {
    'use strict';

    angular
        .module('odontoweb.agenda')
        .controller('AgendamentoNovoController', AgendamentoNovoController);

    AgendamentoNovoController.$inject = ['model', 'ApiService', 'AgendamentoService', 'AgendaService' , 'entidades', '$uibModalInstance'];

    function AgendamentoNovoController(model, ApiService, AgendamentoService, AgendaService, entidades, $uibModalInstance) {
        var vm = this;
        vm.dataInicio = new Date(model.dataInicio);
        vm.dataFim = new Date(model.dataFim);
        vm.usuarioClinica = model.usuarioClinica;
        vm.calendarView = model.calendarView,
        vm.viewDate = model.viewDate,
        vm.autocompletePaciente = autocompletePaciente;
        vm.completing = false;
        vm.selectPaciente = selectPaciente;
        vm.agendamento = {};
        vm.agendar = agendar;

        activate();

        function activate() {
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
        * Agenda consulta
        */
        function agendar(isValid) {
            if(isValid) {
                vm.request = buildRequestModel();
                return AgendamentoService.agendar(vm.request, vm.usuarioClinica)
                        .then(function(dados) {
                            toastr.success('Agendamento salvo com sucesso!');
                            $uibModalInstance.close(listaEventosDentista());
                        },function(error) {
                            toastr.error('Erro ao salvar agendamento!');
                        });
            }
        }

        /*
        * Monta o objeto do agendamento
        */
        function buildRequestModel() {
            return {
                encaixe: false,
                observacao: vm.agendamento.observacao,
                dataInicio: vm.dataInicio.getTime(),
                dataFim: vm.dataFim.getTime(),
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